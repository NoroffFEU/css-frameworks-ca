import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../api_constants.mjs";
import { showMessage } from "../../utils/messages.mjs";

const COMMENT_ACTION = "/comment";

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
