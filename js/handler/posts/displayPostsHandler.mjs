import { renderAllPosts } from "../../templates/index.mjs";
import * as postMethod from "../../api/posts/index.mjs";
import { sortPosts } from "./sortPosts.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

/**
 * Fetches all posts, renders them, and sorts them.
 * If an error occurs during this process, it displays an error message.
 *
 */

export async function displayPostsHandler() {
  try {
    const posts = await postMethod.getAllPosts();
    const container = document.querySelector("#card");
    renderAllPosts(posts, container);
    sortPosts(posts);

  } catch (error) {
    displayMessage(
      "#message",
      "danger",
      "Something went wrong trying to sort the posts."
    );
  }
}
