/** "+250 788 472 859" → "tel:+250788472859". Spaces help people read; phones only need digits. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** WhatsApp click-to-chat link. wa.me wants digits only (no "+", no spaces), plus an optional message. */
export function whatsappHref(phone: string, message?: string): string {
  const url = `https://wa.me/${phone.replace(/\D/g, "")}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}

/** Google Maps search link (opens the Maps app on phones) */
export function mapsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
