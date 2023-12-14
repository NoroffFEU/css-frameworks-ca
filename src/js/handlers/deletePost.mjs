import { removePost } from "../api/posts/delete.mjs";
import { API_SOCIAL_URL } from "../api/constants.mjs";
import { authFetch } from "../api/authFetch.mjs";

/**
 * This function to add event listener to delete button when if condition is met
 */
export function deletePost(id) {
  document.querySelector("#removePost").addEventListener("click", () => {
    removePost(id);
  });
}