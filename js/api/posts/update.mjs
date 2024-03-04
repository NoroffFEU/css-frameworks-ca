import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { showMessage } from "../../utils/messages.mjs";

const action = "/posts";
const method = "PUT";

export async function updatePost(title, body, media, id) {
  try {
    if (!id) {
      throw new Error("Update requires a postID");
    }

    const postData = {
      title: title,
      body: body,
      media: media,
      id: id,
    };

    const updatePostURL = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(updatePostURL, {
      method,
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to update post: ${response.status}");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
    showMessage("Failed to update post. Please try again later.", "error");
    throw error;
  }
}
