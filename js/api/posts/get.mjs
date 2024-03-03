import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "get";

export async function getPosts() {
  const getPostURL = `${API_SOCIAL_URL}${action}?_author=true&_comments=true`;

  const response = await authFetch(getPostURL);

  return await response.json();
}
export async function getPostById(id) {
  if (!id) {
    throw new Error("Get requires a postID");
  }
  const getPostURL = `${API_SOCIAL_URL}${action}/${id}?_author=true?&_comments=true`;

  const response = await authFetch(getPostURL);

  return await response.json();
}



export async function getCommentsForPost(postId) {
  if (!postId) {
    throw new Error("getPostComments requires a postId");
  }

  const getCommentsURL = `${API_SOCIAL_URL}${action}/${postId}?_author=true?&_comments=true`;

  try {
    const response = await authFetch(getCommentsURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.status}`);
    }

   const responseData = await response.json();
    console.log("Response Data:", responseData);
    
  } catch (error) {
    // Handle errors
    console.error("Failed to fetch comments:", error);
    throw error;
  }
}
