import { load } from "../storage/index.mjs";

/**
 * @description
 * Generates the headers object for API requests, including the authorization token.
 *
 */

export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * @description
 * Performs a fetch by including the authorization headers in the request
 */

export async function authFetch(url, options) {
  return fetch(url, { ...options, headers: headers() });
}
