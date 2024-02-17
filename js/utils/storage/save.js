/**
 * Saves a value to local storage.
 *
 * It takes a key and a value. If the value is not a string, it stringifies it.
 * It then saves the value (as a string) to local storage under the provided key.
 *
 * @param {string} key - The key under which the value will be saved in local storage.
 * @param {any} value - The value to be saved. If it's not a string, it will be stringified before saving.
 */

export function save(key, value) {
  let savedInfo = value;
  if (typeof value !== "string") {
    savedInfo = JSON.stringify(value);
  }
  localStorage.setItem(key, savedInfo);
}
