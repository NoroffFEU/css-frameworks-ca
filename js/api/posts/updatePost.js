import { getToken } from "../../utils/helpers/token.js";
import { postsUrl } from "../../constants/api.js";

/**
 * Updates an existing post.
 *
 * @param {Object} post - The post's data.
 * @param {number} post.id - The ID of the post to update.
 * @param {string} post.title - The post's title.
 * @param {string} post.body - The post's body.
 * @param {string} post.media - The URL of the post's media.
 * @returns {Promise<Object>} The response from the server.
 * @throws {Error} If the user is not logged in, the post data is empty, or the server response is not ok.
 */

export async function updatePost(post) {
  const token = getToken();

  const { id } = post;
  delete post.id;

  if (!token) {
    throw new Error("Only author can modify posts");
  }

  const options = {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${postsUrl}/${id}`;
  const response = await fetch(url, options);

  const json = await response.json();

  if (response.ok) {
    return json;
  }
  throw new Error(json.errors[0].message);
}
