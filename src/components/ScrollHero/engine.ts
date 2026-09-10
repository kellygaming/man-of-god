/**
 * ScrollHero — moteur de hero "scrubbé" au scroll, sans dépendance.
 *
 * Le hero joue un seul mouvement de caméra, sans coupe : un travelling avant
 * qui part du hoodie cadré serré et entre dans la matière jusqu'au macro du
 * molleton. La dernière image est presque noire, si bien que le hero se fond
 * dans le fond de la page sans rupture.
 *
 * Deux modes de rendu derrière la même API :
 *
 *  - "frames"    : séquence d'images extraites du clip vidéo (rendu final).
 *  - "keyframes" : deux images clés (hoodie, tissu) interpolées par zoom et
 *                  fondu sur canvas. Repli réseau lent et mode maquette.
 */

export type HeroMode = 'frames' | 'keyframes';

export interface FrameSet {
  /** Nombre de frames de la séquence. */
  count: number;
  /** Préfixe d'URL, ex. "/hero/frames/16x9/". */
  path: string;
  /** Préfixe des fichiers, avant l'index. Par défaut "a". */
  prefix?: string;
  /** Extension des fichiers, sans le point. Par défaut "webp". */
  ext?: string;
  /** Nombre de chiffres de l'index : 4 donne `a_0001.webp`. Par défaut 4. */
  pad?: number;
}

/**
 * Nom de fichier d'une frame. Le jeu d'options doit rester sérialisable pour
 * traverser la frontière serveur/client de Next : d'où une description du
 * nommage plutôt qu'une fonction.
 */
function frameSrc(set: FrameSet, oneBasedIndex: number) {
  const index = String(oneBasedIndex).padStart(set.pad ?? 4, '0');
  return `${set.path}${set.prefix ?? 'a'}_${index}.${set.ext ?? 'webp'}`;
}

export interface KeyframeSet {
  /** Image de départ : le hoodie cadré serré. */
  hoodie: string;
  /** Image d'arrivée : le macro du molleton. */
  fabric: string;
}

/** Plages de progression (0→1) sur lesquelles chaque bloc de texte est visible. */
export type Chapters = Record<string, [number, number]>;

export interface ScrollHeroOptions {
  mode?: HeroMode;
  keyframes?: KeyframeSet;
  frames?: FrameSet;
  /** Séquence 9:16 utilisée sous 768 px. */
  mobileFrames?: FrameSet;
  chapters?: Chapters;
  /** Inertie du scroll : 0 = brut, 1 = figé. */
  smoothing?: number;
  maxDpr?: number;
  /** Frames préchargées en priorité devant le curseur. */
  preloadAhead?: number;
  onReady?: () => void;
  onProgress?: (progress: number) => void;
}

const DEFAULT_CHAPTERS: Chapters = {
  intro: [0.0, 0.14],
  texture: [0.3, 0.62],
  outro: [0.74, 1.01],
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Grossissement du hoodie au moment où le macro tissu prend le relais. */
const ZOOM_MAX = 3.2;

/** Promesse d'image qui mémorise son résultat pour un accès synchrone au rendu. */
type PendingImage = Promise<HTMLImageElement | null> & { settled?: HTMLImageElement | null };

export class ScrollHero {
  private readonly root: HTMLElement;
  private readonly sticky: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly opts: Required<
    Pick<ScrollHeroOptions, 'mode' | 'chapters' | 'smoothing' | 'maxDpr' | 'preloadAhead'>
  > &
    ScrollHeroOptions;

  private chapterEls: HTMLElement[] = [];
  private target = 0;
  private current = 0;
  private dirty = true;
  private rafId = 0;
  private disposed = false;
  private reduced = false;

  private vw = 0;
  private vh = 0;

  // mode keyframes
  private kHoodie: HTMLImageElement | null = null;
  private kFabric: HTMLImageElement | null = null;

  // mode frames
  private cache = new Map<number, PendingImage>();
  private frameSet: FrameSet | null = null;

  constructor(root: HTMLElement, options: ScrollHeroOptions = {}) {
    const sticky = root.querySelector<HTMLElement>('[data-hero-sticky]');
    const canvas = root.querySelector<HTMLCanvasElement>('canvas');
    if (!sticky || !canvas) throw new Error('[ScrollHero] structure DOM incomplète.');

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('[ScrollHero] canvas 2d indisponible.');

    this.root = root;
    this.sticky = sticky;
    this.canvas = canvas;
    this.ctx = ctx;
    this.opts = {
      mode: 'keyframes',
      chapters: DEFAULT_CHAPTERS,
      smoothing: 0.14,
      maxDpr: 2,
      preloadAhead: 24,
      ...options,
    };

    this.chapterEls = Array.from(root.querySelectorAll<HTMLElement>('[data-chapter]'));
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.tick = this.tick.bind(this);

    void this.setup();
  }

  // ---------------------------------------------------------------- cycle de vie

  private async setup() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });

    try {
      if (this.opts.mode === 'frames') await this.setupFrames();
      else await this.setupKeyframes();
    } catch (err) {
      console.warn('[ScrollHero] préparation incomplète :', err);
    }
    if (this.disposed) return;

    this.opts.onReady?.();

    if (this.reduced) {
      this.draw(0);
      this.updateUI(0);
      return;
    }

    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
    this.rafId = requestAnimationFrame(this.tick);
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    this.cache.clear();
  }

  // ------------------------------------------------------------- mode keyframes

  private async setupKeyframes() {
    const k = this.opts.keyframes;
    if (!k) throw new Error('option `keyframes` manquante');
    const [hoodie, fabric] = await Promise.all([loadImage(k.hoodie), loadImage(k.fabric)]);
    this.kHoodie = hoodie;
    this.kFabric = fabric;
    this.dirty = true;
  }

  // ---------------------------------------------------------------- mode frames

  private async setupFrames() {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const set = (isMobile && this.opts.mobileFrames) || this.opts.frames;
    if (!set) throw new Error('option `frames` manquante');
    this.frameSet = set;

    // Première frame bloquante, le reste en tâche de fond.
    await this.loadFrame(0);
    void this.backgroundPreload();
  }

  private loadFrame(index: number): PendingImage {
    const hit = this.cache.get(index);
    if (hit) return hit;

    const pending = loadImage(frameSrc(this.frameSet!, index + 1)).then((img) => {
      pending.settled = img;
      this.dirty = true;
      return img;
    }) as PendingImage;
    pending.settled = undefined;
    this.cache.set(index, pending);
    return pending;
  }

  /** Vagues de préchargement : 1 frame sur 8, puis sur 4, 2, 1. */
  private async backgroundPreload() {
    const total = this.frameSet?.count ?? 0;
    const seen = new Set<number>();
    for (let step = 8; step >= 1; step = step >> 1) {
      for (let i = 0; i < total; i += step) {
        if (this.disposed) return;
        if (seen.has(i)) continue;
        seen.add(i);
        await this.loadFrame(i);
      }
    }
  }

  /** Frame chargée la plus proche : évite les trous pendant le préchargement. */
  private nearestLoaded(index: number): HTMLImageElement | null {
    const total = this.frameSet?.count ?? 0;
    for (let d = 0; d < total; d++) {
      for (const i of [index - d, index + d]) {
        if (i < 0 || i >= total) continue;
        const img = this.cache.get(i)?.settled;
        if (img) return img;
      }
    }
    return null;
  }

  // -------------------------------------------------------------------- boucle

  private onResize() {
    const dpr = Math.min(window.devicePixelRatio || 1, this.opts.maxDpr);
    const w = this.sticky.clientWidth;
    const h = this.sticky.clientHeight;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.vw = w;
    this.vh = h;
    this.dirty = true;
  }

  private onScroll() {
    const track = this.root.offsetHeight - this.vh;
    if (track <= 0) return;
    const top = this.root.getBoundingClientRect().top;
    this.target = clamp(-top / track, 0, 1);
    this.root.classList.toggle('is-scrolled', this.target > 0.02);
    this.dirty = true;
  }

  private tick() {
    if (this.disposed) return;
    const diff = this.target - this.current;
    if (Math.abs(diff) > 0.0004) {
      this.current += diff * this.opts.smoothing;
      this.dirty = true;
    } else if (this.dirty) {
      this.current = this.target;
    }
    if (this.dirty) {
      this.draw(this.current);
      this.updateUI(this.current);
      this.dirty = false;
    }
    this.rafId = requestAnimationFrame(this.tick);
  }

  private updateUI(p: number) {
    for (const el of this.chapterEls) {
      const range = this.opts.chapters[el.dataset.chapter ?? ''];
      if (!range) continue;
      el.classList.toggle('is-active', p >= range[0] && p < range[1]);
    }
    this.root.style.setProperty('--hero-progress', p.toFixed(4));
    this.opts.onProgress?.(p);
  }

  // -------------------------------------------------------------------- rendu

  private draw(p: number) {
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.vw, this.vh);
    if (this.opts.mode === 'frames') this.drawFrames(p);
    else this.drawKeyframes(p);
  }

  private drawFrames(p: number) {
    const total = this.frameSet?.count ?? 0;
    if (!total) return;

    const index = Math.round(clamp(p, 0, 1) * (total - 1));
    const img = this.cache.get(index)?.settled ?? this.nearestLoaded(index);
    if (img) this.cover(img, 1, 1);

    for (let d = 1; d <= this.opts.preloadAhead; d++) {
      const i = index + d;
      if (i < total) this.loadFrame(i);
    }
  }

  /** Approximation du travelling : le hoodie grossit, le tissu monte en fondu. */
  private drawKeyframes(p: number) {
    const t = easeInOut(clamp(p, 0, 1));
    this.cover(this.kHoodie, lerp(1, ZOOM_MAX, t), 1);
    this.cover(this.kFabric, lerp(1.6, 1, t), clamp((t - 0.55) / 0.45, 0, 1));
  }

  /** Dessine une image en object-fit: cover, centrée, avec zoom et opacité. */
  private cover(img: HTMLImageElement | null, scale = 1, alpha = 1) {
    if (!img || alpha <= 0 || !img.naturalWidth) return;
    const ratio = Math.max(this.vw / img.naturalWidth, this.vh / img.naturalHeight) * scale;
    const w = img.naturalWidth * ratio;
    const h = img.naturalHeight * ratio;
    this.ctx.globalAlpha = alpha;
    this.ctx.drawImage(img, (this.vw - w) / 2, (this.vh - h) / 2, w, h);
    this.ctx.globalAlpha = 1;
  }
}

/** Charge une image ; une image manquante résout `null` et ne bloque jamais le hero. */
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn('[ScrollHero] image introuvable :', src);
      resolve(null);
    };
    img.src = src;
  });
}
