/**
 * Retrieves a value from local storage.
 *
 * It takes a key and retrieves the corresponding value from local storage.
 * If the value is a stringified JSON, it parses it before returning.
 * If the value is not a stringified JSON, it returns the value as is.
 * If the key does not exist, it returns null.
 *
 * @param {string} key - The key of the value to retrieve from local storage.
 * @returns {any} The value from local storage. If the value was a stringified JSON, it is returned as a parsed object. If the key does not exist, it returns null.
 */

export function get(key) {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item);
  } catch (error) {
    return item;
  }
}
