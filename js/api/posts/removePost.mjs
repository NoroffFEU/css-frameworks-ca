import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "posts";
const method = "delete";

/**
 * Deletes a post by its ID from the server.
 *
 * @param {number} id - The ID of the post to delete.
 * @returns {Promise<Object>} A promise that resolves to the server's response as a JSON object.
 *
 * @example
 *
 * removePost(1)
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */

export async function removePost(id) {
  const removePostURL = `${BASE_URL}${action}/${id}`;

  const response = await fetchToken(removePostURL, {
    method,
  });

  return await response.json();
}
