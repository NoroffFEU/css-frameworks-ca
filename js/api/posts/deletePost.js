import { postsUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";

/**
 * Deletes a post.
 *
 * @param {string} id - The ID of the post to delete.
 * @returns {Promise<Object>} The response from the server.
 * @throws {Error} If the user is not logged in or the server response is not ok.
 */

export async function deletePost(id) {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to delete posts");
  }

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const deleteUrl = `${postsUrl}/${id}`;
  const response = await fetch(deleteUrl, options);
  console.log(response);
  const results = await response.json();

  if (!response.ok) {
    throw new Error(results.errors[0].message);
  }
  return results;
}
