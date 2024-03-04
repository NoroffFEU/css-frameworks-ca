import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../api_constants.mjs";
import { showMessage } from "../../utils/messages.mjs";

const COMMENT_ACTION = "/comment";

/**
 * Adds a comment to a post.
 * @param {string} postId - The ID of the post to add the comment to.
 * @param {string} commentText - The text content of the comment.
 * @param {string|null} [replyToId=null] - The ID of the comment being replied to, if any.
 * @returns {Promise<Object>} - A promise resolving to the added comment object.
 * @throws {Error} - Throws an error if adding the comment fails.
 */
export async function addComment(postId, commentText, replyToId = null) {
  const commentUrl = `${API_SOCIAL_URL}/posts/${postId}${COMMENT_ACTION}`;
  const fetchOptions = {
    method: "POST",
    body: JSON.stringify({
      body: commentText,
      replyToId: replyToId,
    }),
  };

  try {
    const response = await authFetch(commentUrl, fetchOptions);

    if (!response.ok) {
      const errorMessage = `Failed to add comment: ${error.message}`;
      showMessage(errorMessage, "error");
      throw new Error("Failed to add comment");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    const errorMessage = `Failed to add comment: ${error.message}`;
    showMessage(errorMessage, "error");
    throw new Error("Failed to add comment");
  }
}
