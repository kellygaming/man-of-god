/** Informations de contact et identité de la marque. */
export const SITE = {
  name: 'AURA BRAND',
  /** Collection en cours, imprimée sur les vêtements. */
  collection: 'MOG & WOG',
  tagline: 'Porté avec foi. Porté avec style.',
  description:
    "AURA BRAND, streetwear chrétien pensé en Côte d'Ivoire. Collection MAN OF GOD et WOMAN OF GOD : pulls, t-shirts et tops en coton lourd, sérigraphie haute densité.",
  url: 'https://aurabrand.ci',
  phone: '+2250101019747',
  phoneDisplay: '01 01 01 97 47',
  whatsapp: '2250101019747',
  tiktok: 'https://www.tiktok.com/@aura_brand.civ',
  tiktokHandle: '@aura_brand.civ',
  city: 'Abidjan',
  country: 'Côte d’Ivoire',
} as const;

/** Lien de commande WhatsApp pré-rempli avec le produit choisi. */
export function orderLink(productName?: string) {
  const text = productName
    ? `Bonjour, je souhaite commander : ${productName}.`
    : 'Bonjour, je souhaite passer une commande.';
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
