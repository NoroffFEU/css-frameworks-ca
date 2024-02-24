import { getPost } from "../../api/posts/index.mjs";
import { renderSinglePost } from "../../templates/index.mjs";
import { getParams } from "../../handler/utils/getParams.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

/**
 * Fetches all posts, renders them, and sorts them.
 * If an error occurs during this process, it displays an error message.
 *
 */

export async function displayPostHandler() {
  console.log("displayPostHandler called");
  try {
    const id = getParams("id");
    console.log("Retrieved id:", id);
    if (!id) {
      throw new Error("No post ID was provided.");
    }
    const post = await getPost(id);
    console.log("Retrieved post:", post);
    if (post) {
      renderSinglePost(post, "#card");
    }
  } catch (error) {
    displayMessage(
      "#message",
      "danger",
      "Something went wrong trying to sort the posts."
    );
  }
}
