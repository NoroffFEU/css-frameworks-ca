/**
 * Gets the value of a specific URL parameter.
 *
 * @param {string} paramName - The name of the URL parameter to get the value of.
 * @returns {string|null} The value of the URL parameter, or null if the parameter does not exist.
 */

export function getParams(paramName) {
  console.log("getParams called with param:", paramName);
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(paramName);
  console.log("getParams returning value:", paramValue);
  if (!paramValue) {
    return null;
  }
  return paramValue;
}
