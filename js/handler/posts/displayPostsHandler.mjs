import { renderAllPosts } from "../../templates/index.mjs";
import * as postMethod from "../../api/posts/index.mjs";
import { sortPosts } from "./sortPosts.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

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
