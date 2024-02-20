import { getSinglePost } from "../../api/posts/getSinglePost.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderSinglePost } from "../../ui/renderSinglePost.js";
import { getParams } from "../../utils/helpers/getParams.js";

/**
 * Handles the display of a single post.
 *
 * It retrieves the post ID from the URL, fetches the post with that ID, and renders it.
 * If the fetch fails or the post ID is not found in the URL, it displays an error message to the user.
 *
 * @param {number} id - The ID of the post to display.
 */
export async function displaySinglePostHandler() {
  try {
    const id = getParams("id");

    if (!id) {
      throw new Error("Sorry, we couldn't find the post you're looking for.");
    }

    const post = await getSinglePost(id);

    if (post) {
      document.title = `Vib'n | ${post.title}`;
      renderSinglePost("#post", post);
    }
  } catch (error) {
    console.log(error);
    messageForUser("#post", "danger", error.message);
  }
}
