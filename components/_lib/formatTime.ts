/**
 * Function Formats time to a human-readable format from a string
 *
 * @param time - The time to format
 * @returns The formatted time
 *
 * @example
 * const time = formatTime(1630364837)
 *   // Output: 2021-08-31 12:00:00
 *
 */
export function formatTime(unixTimestamp: number): string {
  // Create a new Date object from the Unix timestamp (milliseconds)
  const date = new Date(unixTimestamp * 1000);

  // Format the date and time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Construct the formatted time string
  const formattedTime = `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;

  return formattedTime;
}
