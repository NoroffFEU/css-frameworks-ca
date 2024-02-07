import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "posts";
const method = "POST";

export async function createPost(postData) {
  try {
    const createPostURL = BASE_URL + action;

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("body", postData.body);
    formData.append("media", postData.media);

    console.log("FormData:", formData); 

    const response = await fetchToken(createPostURL, {
      method,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
}
