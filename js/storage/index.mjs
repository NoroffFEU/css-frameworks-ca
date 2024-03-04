/**
 * Saves a value to the local storage with the specified key.
 * @param {string} key - The key under which to save the value.
 * @param {any} value - The value to be saved.
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Loads a value from the local storage using the specified key.
 * @param {string} key - The key associated with the value to load.
 * @returns {any} - The value associated with the specified key, or null if the key does not exist.
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}
/**
 * Removes a value from the local storage using the specified key.
 * @param {string} key - The key associated with the value to remove.
 */
export function remove(key) {
  localStorage.removeItem(key);
}
