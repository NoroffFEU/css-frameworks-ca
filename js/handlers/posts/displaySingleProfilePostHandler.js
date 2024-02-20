import { getSingleProfilePost } from "../../api/posts/getSingleProfilePost.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderSingleProfilePost } from "../../ui/renderSingleProfilePost.js";
import { getUserName } from "../../utils/helpers/getUserName.js";
import { deletePostHandler } from "./deletePostHandler.js";
import { getParams } from "../../utils/helpers/getParams.js";

/**
 * Handles the display of a single profile post.
 *
 * It retrieves the post ID from the URL, fetches the post with that ID, and renders it.
 * If the fetch fails, the post ID is not found in the URL, or user information is not found, it displays an error message to the user.
 *
 * @param {number} id - The ID of the post to display.
 */

export async function displaySingleProfilePostHandler() {
  try {
    const id = getParams("id");
    const userName = getUserName();

    if (!id) {
      throw new Error("Sorry, we couldn't find the post you're looking for.");
    }
    if (!userName) {
      throw new Error("User information not found");
    }

    const post = await getSingleProfilePost(id);

    if (post) {
      document.title = `Vib'n | ${post.title}`;
      renderSingleProfilePost("#post", post);
      deletePostHandler();
    }
  } catch (error) {
    console.log(error);
    messageForUser("#post", "danger", error.message);
  }
}
