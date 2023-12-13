import { API_SOCIAL_URL } from "../constants.mjs";
import { displayError } from "../../handlers/error.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";

/**
 * this function let us update post by id
 * @param {string} postData
 * @returns
 */

export async function updatePost(postData) {
  if (!postData.id) {
    throw new Error("Update requires a postID");
  }
    
  postData.tags = postData.tags.split(" ");
  const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id} `;
  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  });
  alert("Your post has updated");
  window.location.replace("/posts/myPosts.html");
  return await response.json();
}