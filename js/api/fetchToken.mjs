import { get } from "../handler/storage.mjs";

/**
 * Generates headers for an HTTP request, including the Authorization header with the current token.
 *
 * @returns {Object} An object containing the headers.
 */
export function headers() {
  const token = get("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Sends an HTTP request with the Authorization header included.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} [options={}] - Optional options for the fetch request.
 * @returns {Promise<Response>} A promise that resolves to the Response object representing the response to the request.
 */
export async function fetchToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
