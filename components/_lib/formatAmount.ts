/**
 * Function to format an amount to cents for Stripe payment.
 *
 * @param amount - The amount to format
 * @returns The amount in cents
 * @example
 * const amount = formatAmount("10.00")
 *  // Output: 1000
 **/
export function formatAmount(amount: string): number {
  // Parse the string to a float
  const amountFloat = parseFloat(amount);

  // Check if the parsed amount is a valid number
  if (isNaN(amountFloat)) {
    throw new Error("Invalid amount format");
  }

  // Multiply by 100 and round to get the amount in cents
  const amountInCents = Math.round(amountFloat * 100);

  return amountInCents;
}

/**
 * Function to format cents to dollars for display.
 *
 * @param amount - The amount in cents
 * @returns The amount in dollars
 * @example
 * const amount = formatAmount(1000)
 * // Output: 10.00
 **/
export function formatCentsToAmount(amount: number): string {
  // Check if the input is a valid number
  if (isNaN(amount)) {
    throw new Error("Invalid amount in cents");
  }

  // Convert the amount from cents to dollars
  const formattedAmount = (amount / 100).toFixed(2);

  return formattedAmount;
}
