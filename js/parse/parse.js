/**
 * Parses a date string into a localized date format.
 *
 * This function converts the provided date string into a localized date format and returns the result as a string.
 *
 * @param {string|Date} date - The date to be parsed, either as a string or a Date object.
 * @returns {string} - The parsed date in a localized date format.
 *
 * @example
 * // Example usage:
 * const dateString = "2023-10-05T14:30:00Z";
 * const parsedDate = parseDate(dateString);
 *
 * // Return  localized date string, e.g., "10/5/2023"
 */

export const parseDate = (date) => {
  const parsedDate = new Date(date).toLocaleDateString();
  return parsedDate;
};
