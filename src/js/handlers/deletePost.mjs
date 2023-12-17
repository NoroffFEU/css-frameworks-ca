import { removePost } from "../api/posts/delete.mjs";
import { API_SOCIAL_URL } from "../api/constants.mjs";
import { authFetch } from "../api/authFetch.mjs";


export function deletePost(id) {
  document.querySelector("#removePost").addEventListener("click", () => {
    removePost(id);
  });
}
