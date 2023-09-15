/**
 * Retrieve value from a url query parameter
 * @param {string} parameter - The name of the query parameter to retrieve
 * @returns {string|null} The value of the query parameter if found, or null if not
 */
export function getValueFromURLParameter(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}