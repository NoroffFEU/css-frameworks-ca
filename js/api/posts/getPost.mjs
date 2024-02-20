import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "posts";

export async function getPost(id) {
  const getPostURL = `${BASE_URL}${action}/${id}`;

  try {
    const response = await fetchToken(getPostURL);
    if (!response.ok) {
      throw new Error(`You must be logged in to continue. ${response.status}`);
    }

    const post = await response.json();
    document.title = `Javascript2 CA | ${post.title}`;
    return post;
  } catch (error) {
    console.error("Failed to get post:", error);
    throw error;
  }
}
