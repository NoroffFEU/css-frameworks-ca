import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { showMessage } from "../../utils/messages.mjs";

const action = "/posts";
const method = "delete";

/**
 * Removes a post by its ID.
 * @param {string} id - The ID of the post to be removed.
 * @returns {Promise<Object>} - A promise resolving to the removed post object.
 * @throws {Error} - Throws an error if removing the post fails.
 */

export async function removePost(id) {
  try {
    if (!id) {
      throw new Error("Delete requires a postID");
    }

    const deletePostURL = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(deletePostURL, {
      method,
    });

    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error removing post:", error);
    showMessage("Failed to delete post. Please try again later.", "error");
    throw error;
  }
}
