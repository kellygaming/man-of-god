import Hero from '@/components/ScrollHero';
import Collection from '@/components/sections/Collection';
import Material from '@/components/sections/Material';
import Order from '@/components/sections/Order';
import Footer from '@/components/sections/Footer';
import {
  HERO_FRAMES,
  HERO_FRAMES_MOBILE,
  HERO_KEYFRAMES,
  HERO_MODE,
} from '@/config/hero';

export default function Home() {
  return (
    <main>
      <Hero
        options={
          HERO_MODE === 'frames'
            ? { mode: 'frames', frames: HERO_FRAMES, mobileFrames: HERO_FRAMES_MOBILE }
            : { mode: 'keyframes', keyframes: HERO_KEYFRAMES }
        }
      />
      <Collection />
      <Material />
      <Order />
      <Footer />
    </main>
  );
}
