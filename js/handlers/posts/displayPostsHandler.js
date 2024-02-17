import { getAllPosts } from "../../api/posts/getAllPosts.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderPosts } from "../../ui/renderPosts.js";

/**
 * Handles the display of all posts.
 *
 * It fetches all posts and renders them.
 * If the fetch fails, it displays an error message to the user.
 */

export async function displayPostsHandler() {
  try {
    const posts = await getAllPosts();
    renderPosts("#posts", posts);
  } catch (error) {
    console.log(error);
    messageForUser("#posts", "danger", error.message);
  }
}
