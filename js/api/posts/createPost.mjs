import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "posts";
const method = "POST";

/**
 * Creates a new post with the provided post data.
 *
 * @param {Object} postData - The data of the post to be created. Must not be empty.
 * @returns {Promise<Object>} The response from the server as a JSON object.
 * @throws {Error} If the post data is empty or if the server response is not ok, throws an error with the appropriate message.
 *
 * @example
 *
 * const postData = {
 *   title: 'New Post',
 *   body: 'This is a new post.'
 * };
 *
 * createPost(postData)
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */

export async function createPost(postData) {
  if (!postData || Object.keys(postData).length === 0) {
    throw new Error("Post data cannot be empty");
  }

  try {
    const createPostURL = `${BASE_URL}${action}`;

    const response = await fetchToken(createPostURL, {
      method,
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
}
