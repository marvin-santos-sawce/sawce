// Store contact channels. Every purchase on the site is finished in WhatsApp.
export const WHATSAPP_NUMBER = "5551997421676";
export const INSTAGRAM_URL = "https://www.instagram.com/sawce.imports";

export const DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Sawce Company e gostaria de mais informações.";

export function whatsappLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productMessage(productName: string): string {
  return `Olá! Vim pelo site e gostaria de mais informações sobre o produto: ${productName}`;
}

export function productWhatsappLink(productName: string): string {
  return whatsappLink(productMessage(productName));
}
