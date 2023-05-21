import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "delete";

/**
  *Removes a post with the specified ID.
  *@param {string} id - The ID of the post to be removed.

  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the removed post.

  *@throws {Error} - If the ID parameter is missing or invalid.
  *export async function removePost(id) {
    if (!id) {
    throw new Error("Delete requires a postID");
    }
    const removePostUrl = ${API_SOCIAL_URL}${action}/${id};
  
  *Sends a request to remove a post from the server.
  *@type {Response} - The response object returned by the server.
  const response = await authFetch(removePostUrl, {
          method
          });
  *Parses the JSON response from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the removed post.
  return await response.json();
  };
 */

export async function removePost(id) {
   if (!id) {
      throw new Error("Delete requires a postID");
      }

  const removePostUrl = `${API_SOCIAL_URL}${action}/${id}`;
  const response = await authFetch(removePostUrl, {
    method
  });
  return await response.json();
};

