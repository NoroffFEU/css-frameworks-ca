import { getAllPosts } from "../../api/posts/getAllPosts.js";
import { getSortedPosts } from "../../api/posts/getSortedPosts.js";
import { messageForUser } from "../../ui/messageForUser.js";

/**
 * Handles the sorting of posts.
 *
 * When the document is loaded, it fetches all posts and sorts them.
 * If the fetch or sorting fails, it displays an error message to the user.
 */

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
