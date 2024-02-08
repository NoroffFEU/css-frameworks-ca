import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "posts";
const method = "POST";

export async function createPost(postData) {
  if (!postData || Object.keys(postData).length === 0) {
    throw new Error("Post data cannot be empty");
  }

  try {
    const createPostURL = BASE_URL + action;

    const response = await fetchToken(createPostURL, {
      method,
      body: formData,
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
