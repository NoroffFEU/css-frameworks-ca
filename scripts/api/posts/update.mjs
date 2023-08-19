import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";

export async function updatePost(postData) {
  if (!postData.id) {
    throw new Error("Update requires a postID");
  }

  const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

  try {
    const response = await authFetch(updatePostURL, {
      method,
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Update failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Update failed: ${error.message}`);
  }
}

