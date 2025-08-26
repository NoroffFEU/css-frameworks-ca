import { getAllPosts } from "../../api/posts/getAllPosts.js";
import { getSortedPosts } from "../../api/posts/getSortedPosts.js";
import { messageForUser } from "../../ui/messageForUser.js";

/**
 * Handles the sorting of posts.
 *
 * When the document is loaded, it fetches all posts and sorts them based on a predefined criteria.
 * If the fetch or sorting fails, it displays an error message to the user.
 *
 * The sorting criteria and order are determined by the implementation of the 'getSortedPosts' function.
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
