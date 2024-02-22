import { getAllPosts } from "../../api/posts/index.mjs";
import { getSortedPosts } from "../../api/posts/index.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

export function handlePostSort() {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const posts = await getAllPosts();
      getSortedPosts(posts);
    } catch (error) {
      console.error(error);
      displayMessage("#message", "danger", "Failed filtering posts.");
    }
  });
}
