import { renderProfilePosts } from "../../templates/index.mjs";
import * as postMethods from "../../api/posts/index.mjs";
import { getUserName } from "../storage.mjs";
import { removePostsHandler } from "./removePostsHandler.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

/**
 * Fetches and displays the posts of the currently logged in user.
 * If the user is not logged in, it throws an error.
 * If an error occurs during this process, it displays an error message.
 *
 * @throws {Error} If the username is not found in storage, throws an error.
 */

export async function displayProfilePostHandler() {
  const username = getUserName();

  if (!username) {
    throw new Error("Username not found");
  }

  try {
    const posts = await postMethods.getProfilePosts(username);
    const container = document.querySelector("#card");

    renderProfilePosts(posts, container);
    removePostsHandler();
  } catch (error) {
    console.error(error);
    displayMessage("#message", "danger", "Please log in to create a post.");
  }
}
