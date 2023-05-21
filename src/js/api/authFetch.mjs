import { load } from "../storage/index.mjs";

/**
  *Returns the headers object for API requests with the necessary authorization token.
  *@returns {object} The headers object.
 */
export function headers() {
  const token = load("token");

  return {
   "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
}

/**
  *Performs an authenticated fetch request with the provided URL and options.
  *@param {string} url - The URL to fetch.
  *@param {object} [options={}] - The options object for the fetch request.
  *@returns {Promise<Response>} The fetch request promise.
 */
export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
};
