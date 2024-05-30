import { fetchLocalStorage } from "../localStorage/localStorage.js";

/**
 * Retrieves the value of the "id" query parameter from the current URL.
 *
 * This function extracts and returns the value of the "id" query parameter from the current URL. It uses the `URLSearchParams` object to parse the query string and obtain the value.
 *
 * @returns {string|null} - The value of the "id" query parameter if found, or `null` if it is not present in the URL.
 *
 * @example
 * // Example usage:
 * const postId = getQueryParamId();
 * if (postId) {
 *   // Do something with the retrieved "id" value.
 * } else {
 *   // Handle the case where "id" is not present in the URL.
 * }
 */
export const getQueryParamId = () => {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  return id;
};

/**
 * Creates a profile id based on the "id" query parameter or the user's name.
 *
 * This function generates a profile id by checking for the presence of the "id" query parameter in the URL. If the "id" parameter is found, it uses that value as the profile id. Otherwise, it falls back to the user's name from local storage as the profile identifier.
 *
 * @returns {string} - The profile id, which can be either the "id" query parameter or the user's name.
 *
 * @example
 * // Example usage:
 * const profileId = createProfileId();
 * // profileId will be the "id" query parameter if present, or the user's name if not.
 */

export const createProfileId = () => {
  let profileId = ``;
  const id = getQueryParamId();
  const name = fetchLocalStorage("name");

  if (id) {
    profileId = id;
  } else {
    profileId = name;
  }

  return profileId;
};

/**
 * Updates the current URL by removing the "id" query parameter from the query string.
 *
 * This function modifies the current URL by removing the "id" query parameter from the query string. It utilizes the `window.history.replaceState` method to update the URL without causing a page reload.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * updateHref();
 */
export const updateHref = () => {
  const currentURL = window.location.href;
  const updatedURL = removeQueryParam(currentURL, "id");

  window.history.replaceState({}, document.title, updatedURL);
};

/**
 * Removes a specified query parameter from a URL's query string.
 *
 * This function takes a URL and a query parameter name and removes that parameter from the URL's query string. It returns the modified URL without the specified query parameter.
 *
 * @param {string} url - The original URL with a query string.
 * @param {string} param - The query parameter to be removed.
 * @returns {string} - The modified URL without the specified query parameter.
 *
 * @example
 * // Example usage:
 * const originalURL = "https://example.com/page?id=123&name=john";
 * const updatedURL = removeQueryParam(originalURL, "id");
 * // updatedURL will be "https://example.com/page?name=john"
 */

const removeQueryParam = (url, param) => {
  const urlParts = url.split("?");
  if (urlParts.length < 2) {
    return url;
  }

  const queryParams = urlParts[1].split("&");
  const updatedParams = queryParams.filter((paramPair) => {
    const [key] = paramPair.split("=");
    return key.toLowerCase() !== param.toLowerCase();
  });

  return updatedParams.length > 0 ? urlParts[0] + "?" + updatedParams.join("&") : urlParts[0];
};
