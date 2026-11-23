/**
 * Currency utility using integer arithmetic in paise.
 * 1 Rupee = 100 Paise.
 * Ensures strict monetary accuracy without floating point drift.
 */

export const RUPEE_TO_PAISE = 100;

export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * RUPEE_TO_PAISE);
}

export function paiseToRupees(paise: number): number {
  return Math.floor(paise / RUPEE_TO_PAISE);
}

/**
 * Formats an amount in paise to Indian Rupee string format.
 * Example: 150000 -> "₹1,500", 300000 -> "₹3,000"
 */
export function formatCurrency(paise: number): string {
  const rupees = paiseToRupees(paise);
  // Using en-IN locale format with no decimals for whole rupee amounts
  const formattedNumber = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(rupees);

  return `₹${formattedNumber}`;
}
