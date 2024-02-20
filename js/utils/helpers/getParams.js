/**
 * Retrieves a parameter value from the URL's query string.
 *
 * @param {string} paramName - The name of the parameter to retrieve.
 * @returns {string|null} The value of the parameter, or null if not found.
 * @throws {Error} If the parameter is not found in the URL.
 */

export function getParams(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(paramName);
  if (!paramValue) {
    return null;
  }
  return paramValue;
}
