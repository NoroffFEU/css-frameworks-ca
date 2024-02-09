import { getAllPosts } from "../../api/posts/getAllPosts.js";
import { getSortedPosts } from "../../api/posts/getSortedPosts.js";

export function sortingPostsHandler() {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const posts = await getAllPosts();
      getSortedPosts(posts);
    } catch (error) {
      console.error(error);
      messageForUser("#messageForUser", "danger", "Failed filtering posts.");
    }
  });
}
