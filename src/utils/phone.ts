/**
 * Validates Indian WhatsApp mobile numbers.
 * Requires exactly 10 digits starting with 6, 7, 8, or 9.
 * Allows optional country code (+91 or 91) or leading zero, ignoring whitespace and hyphens.
 */
export function isValidIndianMobile(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  
  // Strip all whitespace, hyphens, brackets, dots
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  
  // Match optional +91, 91, or 0 followed by exactly 10 digits starting with 6-9
  const match = cleaned.match(/^(?:\+91|91|0)?([6-9]\d{9})$/);
  return Boolean(match);
}

/**
 * Normalizes an Indian phone number to 10 digits for clean API / WhatsApp use.
 */
export function normalizeIndianMobile(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  const match = cleaned.match(/^(?:\+91|91|0)?([6-9]\d{9})$/);
  return match ? match[1] : cleaned;
}
