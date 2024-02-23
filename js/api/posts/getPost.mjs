import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

/**
 * Fetches a post by its ID from the server.
 *
 * @param {number} id - The ID of the post to fetch.
 * @returns {Promise<Object>} A promise that resolves to the post data as a JSON object.
 * @throws {Error} If the server response is not ok, throws an error with the message from the server.
 *
 * @example
 *
 * getPost(1)
 *   .then(post => console.log(post))
 *   .catch(error => console.error(error));
 */

const action = "posts";

export async function getPost(id) {
  const getPostURL = `${BASE_URL}${action}/${id}`;

  try {
    const response = await fetchToken(getPostURL);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors[0].message ?? "Failed to get post");
    }
    return json;
  } catch (error) {
    console.error("Failed to get post:", error);
    throw error;
  }
}
