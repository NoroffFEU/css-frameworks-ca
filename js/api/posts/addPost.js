import { postsUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";
import { messageForUser } from "../../ui/messageForUser.js";

/**
 * Adds a new post.
 *
 * @param {Object} postData - The post's data.
 * @param {string} postData.title - The post's title.
 * @param {string} postData.body - The post's body.
 * @param {string} postData.media - The URL of the post's media.
 * @returns {Promise<Object>} The response from the server.
 * @throws {Error} If the user is not logged in, the post data is empty, or the server response is not ok.
 */

export async function addPost(postData) {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to create a post");
  }
  if (!postData || Object.keys(postData).length === 0) {
    throw new Error("Post data cannot be empty");
  }

  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("body", postData.body);
  formData.append("media", postData.media);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  };

  const response = await fetch(postsUrl, options);
  const results = await response.json();

  if (!response.ok) {
    throw new Error(results.errors[0].message);
    messageForUser("#messageForUser", "Post failed to add", "danger");
  }
  return results;
}
