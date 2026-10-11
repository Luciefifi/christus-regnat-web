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
