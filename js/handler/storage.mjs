/**
 * Saves a value to localStorage.
 * @param {string} key - The key under which the value is stored.
 * @param {*} value - The value to be stored.
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves a value from localStorage.
 * @param {string} key - The key under which the value is stored.
 * @returns {*} The retrieved value, or null if an error occurred.
 */
export function get(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * Removes a value from localStorage.
 * @param {string} key - The key under which the value is stored.
 */
export function remove(key) {
  localStorage.removeItem(key);
}
