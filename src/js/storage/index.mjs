/**
   *Saves a value in the local storage.
   *@param {string} key - The key under which the value will be saved.
   *@param {any} value - The value to be saved.
 */
export function save(key, value) {
   localStorage.setItem(key, JSON.stringify(value))
};

/**
   *Loads a value from the local storage.
   *@param {string} key - The key of the value to be loaded.
   *@returns {any} - The loaded value, or null if the value is not found or cannot be parsed.
*/
export function load(key) {
   try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
   } catch {
      return  null;
   }
};

/**
   *Removes a value from the local storage.
   *@param {string} key - The key of the value to be removed.
*/
export function remove(key) {
   localStorage.removeItem(key);
};