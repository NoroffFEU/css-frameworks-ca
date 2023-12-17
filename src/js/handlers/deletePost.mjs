import { removePost } from "../api/posts/delete.mjs";

export function deletePost(id) {
  document.querySelector("#removePost").addEventListener("click", () => {
    removePost(id);
  });
}
