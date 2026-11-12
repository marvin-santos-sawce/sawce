// Public tracking stays on the official Correios site. Do not invent parcel events.
export const CORREIOS_TRACKING_URL = "https://rastreamento.correios.com.br/app/index.php";

export function normalizeTrackingCode(value: string): string {
  return value.trim().replace(/\s+/g, "").toUpperCase();
}

export function isTrackingCode(value: string): boolean {
  return /^[A-Z]{2}\d{9}[A-Z]{2}$/.test(normalizeTrackingCode(value));
}