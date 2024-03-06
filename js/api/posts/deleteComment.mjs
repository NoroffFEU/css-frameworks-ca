import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../api_constants.mjs";
import { showMessage } from "../../utils/messages.mjs";

const COMMENT_ACTION = "/comment";

/**
 * Deletes a comment from a post.
 * @param {string} postId - The ID of the post containing the comment.
 * @param {string} commentId - The ID of the comment to be deleted.
 * @returns {Promise<void>} - A promise resolving when the comment is successfully deleted.
 * @throws {Error} - Throws an error if deleting the comment fails.
 */
export async function deleteComment(postId, commentId) {
  const commentUrl = `${API_SOCIAL_URL}/posts/${postId}${COMMENT_ACTION}/${commentId}`;
  const fetchOptions = {
    method: "DELETE",
  };

  try {
    const response = await authFetch(commentUrl, fetchOptions);

    if (!response.ok) {
      const errorMessage = `Failed to delete comment: ${response.status}`;
      showMessage(errorMessage, "error");
      throw new Error("Failed to delete comment");
    }

    // Comment successfully deleted
  } catch (error) {
    const errorMessage = `Failed to delete comment: ${error.message}`;
    showMessage(errorMessage, "error");
    throw new Error("Failed to delete comment");
  }
}
