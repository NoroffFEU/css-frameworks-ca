/**
 * Removes a value from local storage.
 *
 * It takes a key and removes the corresponding value from local storage.
 *
 * @param {string} key - The key of the value to remove from local storage.
 */

export function remove(key) {
  localStorage.removeItem(key);
}
