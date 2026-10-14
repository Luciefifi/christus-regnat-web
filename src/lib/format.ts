// Create the formatter once, at module level, instead of on every call
const rwfNumberFormat = new Intl.NumberFormat("en");

/**
 * Formats an amount in Rwandan francs, e.g. 5000 → "5,000 RWF".
 * RWF has no cents in practice, so only whole, non-negative amounts are allowed.
 */
export function formatRwf(amount: number): string {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new Error(`Invalid RWF amount: ${amount}`);
  }

  return `${rwfNumberFormat.format(amount)} RWF`;
}

/**
 * Formats an ISO date ("2026-11-29") as "day month year" in a given Intl locale:
 * "29 November 2026" (en-GB), "29 novembre 2026" (fr-FR), "29 Ugushyingo 2026" (rw-RW).
 * We build the order ourselves because Intl's Kinyarwanda data gives "2026 Ugushyingo 29".
 */
export function formatDate(isoDate: string, intlLocale: string): string {
  // Noon UTC avoids the date shifting by a day in any timezone
  const date = new Date(`${isoDate}T12:00:00Z`);
  const parts = new Intl.DateTimeFormat(intlLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Kigali",
  }).formatToParts(date);

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${part("day")} ${part("month")} ${part("year")}`;
}
