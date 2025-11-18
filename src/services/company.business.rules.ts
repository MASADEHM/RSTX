// Business rules for company setup

/**
 * Checks if all trade names are unique (case-insensitive, trimmed).
 * @param tradeNames Array of trade name strings
 * @returns true if all are unique, false otherwise
 */
export function areTradeNamesUnique(tradeNames: (string | undefined | null)[]): boolean {
  const normalized = tradeNames
    .filter(name => typeof name === 'string' && name.trim() !== '')
    .map(name => (name as string).trim().toLowerCase());
  const unique = new Set(normalized);
  return unique.size === normalized.length;
}

/**
 * Checks if the sum of shareholder percentages is exactly 100.
 * @param percentages Array of shareholder percentages (numbers)
 * @returns true if sum is 100, false otherwise
 */
export function isShareholderPercentageValid(percentages: number[]): boolean {
  const sum = percentages.reduce((acc, val) => acc + Number(val), 0);
  return Math.abs(sum - 100) < 0.0001;
}

/**
 * Checks if all shareholder names are unique (case-insensitive, trimmed).
 * @param names Array of shareholder name strings
 * @returns true if all are unique, false otherwise
 */
export function areShareholderNamesUnique(names: string[]): boolean {
  const normalized = names.map(name => name.trim().toLowerCase());
  const unique = new Set(normalized);
  return unique.size === normalized.length;
}

/**
 * Checks if all non-empty Emirates IDs are unique among shareholders.
 * @param emiratesIds Array of Emirates ID strings (may include undefined or empty)
 * @returns true if all non-empty IDs are unique, false otherwise
 */
export function areEmiratesIdsUnique(emiratesIds: (string | undefined)[]): boolean {
  const filtered = emiratesIds.map(id => (id || '').trim()).filter(id => id);
  const unique = new Set(filtered);
  return unique.size === filtered.length;
} 