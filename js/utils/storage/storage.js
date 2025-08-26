export * from "./get.js";
export * from "./remove.js";
export * from "./save.js";

/**
 * Removes multiple values from local storage.
 *
 * It takes an array of keys and removes the corresponding values from local storage.
 *
 * @param {Array} keys - The keys of the values to remove from local storage.
 */

export function removeMultiple(keys) {
  keys.forEach((key) => localStorage.removeItem(key));
}
