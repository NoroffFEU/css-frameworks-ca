import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../api_constants.mjs";
import { showMessage } from "../../utils/messages.mjs";

const REACT_ACTION = "/react";

export async function likePost(postId, symbol) {
  const likeUrl = `${API_SOCIAL_URL}/posts/${postId}${REACT_ACTION}/${symbol}`;
  const fetchOptions = {
    method: "PUT",
    body: JSON.stringify({}), // Including an empty JSON body
  };

  try {
    const response = await authFetch(likeUrl, fetchOptions);

    if (!response.ok) {
      const errorMessage = `Failed to like post: ${error.message}`;
      showMessage(errorMessage, "error");
      throw new Error("Failed to like post");
    }

    const responseData = await response.json();
    return responseData.likeCount; // Return the updated like count from the server
  } catch (error) {
    const errorMessage = `Failed to like post: ${error.message}`;
    showMessage(errorMessage, "error");
    throw new Error("Failed to like post");
  }
}
