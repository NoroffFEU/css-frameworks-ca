import { load } from "../storage/index.mjs";

/**
 * Generates the headers object for HTTP requests, including the content type and
 * authorization token.
 */

export function headers() {
  const token = load("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Performs a fetch request with authorization headers automatically included.
 */

export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
