/**
 * Sets a value in the browser's local storage using the specified key.
 *
 * This function stringifies  the provided value as a JSON string and stores it in the local storage under the given key.
 *
 * @param {string} key - The key under which to store the value in local storage.
 * @param {any} value - The value to be stored in local storage.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * setLocalStorage("token", "exampleToken");
 *  // Stores stringified object with "key: token" and "value: exampleToken" in local storage
 */

export const setLocalStorage = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

/**
 * fetches and object from local storage using the specified key value
 *
 * This function fetches the desired object that matches the key value  from local storage, and parses the object before returning it
 * @param {string} key
 * @returns {object}
 *
 * @example
 * //Example usage:
 * fetchLocalStorage("token")
 *
 * //if found returns the token value
 */

export const fetchLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  const parsedData = JSON.parse(data);
  return parsedData;
};
