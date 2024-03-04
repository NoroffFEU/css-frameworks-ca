import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { showMessage } from "../../utils/messages.mjs";

const action = "/posts";

/**
 * Retrieves all posts from the server.
 * @returns {Promise<Object[]>} An array of post objects.
 * @throws {Error} If fetching posts fails.
 */

export async function getPosts() {
  const getPostURL = `${API_SOCIAL_URL}${action}?_author=true&_comments=true`;

  try {
    const response = await authFetch(getPostURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    showMessage("Failed to fetch posts. Please try again later.", "error");
    throw error;
  }
}

/**
 * Retrieves comments for a post from the server.
 * @param {string} postId - The ID of the post to retrieve comments for.
 * @returns {Promise<Object[]>} An array of comment objects.
 * @throws {Error} If fetching comments fails.
 */

export async function getPostById(id) {
  if (!id) {
    throw new Error("Get requires a postID");
  }
  const getPostURL = `${API_SOCIAL_URL}${action}/${id}?_author=true?&_comments=true`;

  try {
    const response = await authFetch(getPostURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    showMessage("Failed to fetch post by ID. Please try again later.", "error");
    throw error;
  }
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
    return responseData; // Return the data if successful
  } catch (error) {
    console.error("Error fetching comments:", error);
    showMessage("Failed to fetch comments. Please try again later.", "error");
    throw error;
  }
}
