/**
 * Commentaires laissés sous les publications TikTok de la marque, repris tels
 * quels. Le nom est le pseudonyme public de la personne : rien n'est reformulé,
 * rien n'est inventé.
 *
 * Les questions sur le Gabon ou le Togo sont gardées volontairement. Elles ne
 * félicitent pas la marque, elles montrent mieux : la demande dépasse déjà la
 * Côte d'Ivoire.
 */
export interface Testimonial {
  name: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { name: 'akassaolympe', text: 'Ce ne sont pas de simples t-shirt, mais des mentaux 🔥' },
  { name: 'LA FEMME DE LA VISION 🌪️❤️👑', text: 'Magnifique ❤️❤️❤️' },
  { name: 'Femmes de Lumière 💡', text: 'Et Women of God ?' },
  { name: 'Eve ✨💨', text: 'Hello je suis intéressé 🥺 je veux le pull' },
  { name: 'moussa', text: 'vous vendez au Gabon ?' },
  { name: 'Miss-gene7', text: 'Expédition Togo ? 🥹🥹' },
  { name: 'Odette Nguessan908', text: 'le numéro pour la commande svp' },
  { name: 'letemplier35', text: 'Très bonne initiative 🥰🥰' },
  { name: 'grâce emmanuelle ✝️💫✨', text: 'wow 🥹 le prix est bon, je vais acheter pour moi 😊' },
  { name: 'HD Gabriel Ngandu', text: 'C’est beau hein' },
  { name: 'Yaoua Charlotte', text: 'Que le seigneur prend le contrôle.' },
  { name: 'Tal’Aura ✨', text: 'Tal’Aura valide 😌❤️' },
];
