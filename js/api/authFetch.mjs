import { load } from "../storage/index.mjs";
import { showMessage } from "../utils/messages.mjs";

/**
 * Retrieves the headers for authenticated requests.
 * @returns {Object} - The headers object containing the authorization token.
 */
export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Performs an authenticated fetch request.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} [options={}] - The options for the fetch request.
 * @returns {Promise<Response>} - A promise resolving to the fetch response.
 * @throws {Error} - Throws an error if fetching data fails.
 */

export async function authFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    showMessage("Failed to fetch data. Please try again.");
    throw new Error("Failed to fetch data. Please try again.");
  }
}
