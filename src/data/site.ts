/** Informations de contact et identité de la marque. */
export const SITE = {
  name: 'MAN OF GOD',
  tagline: 'Porté avec foi. Porté avec style.',
  description:
    "Vêtements chrétiens streetwear pensés en Côte d'Ivoire. Hoodies et t-shirts MOG & WOG, coton lourd, sérigraphie haute densité.",
  url: 'https://manofgod.ci',
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
