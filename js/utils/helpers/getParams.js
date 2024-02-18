/**
 * Retrieves a parameter value from the URL.
 *
 * It takes a parameter name and retrieves its value from the URL's query string.
 * If the parameter is not found, it throws an error.
 *
 * @param {string} paramName - The name of the parameter to retrieve from the URL.
 * @returns {string} The value of the parameter.
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
