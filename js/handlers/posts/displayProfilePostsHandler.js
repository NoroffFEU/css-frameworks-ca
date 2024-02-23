import { getProfilePosts } from "../../api/posts/getProfilePosts.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderProfilePosts } from "../../ui/renderProfilePosts.js";
import { getUserName } from "../../utils/helpers/getUserName.js";
import { deletePostHandler } from "./deletePostHandler.js";

/**
 * Handles the display of profile posts.
 *
 * It fetches the posts of the logged-in user and renders them.
 * If the fetch fails or user information is not found, it displays an error message to the user.
 */

export async function displayProfilePostsHandler() {
  try {
    const userName = getUserName();

    if (!userName) {
      throw new Error("User information not found");
    }

    const posts = await getProfilePosts(userName);
    renderProfilePosts("#postsContainer", posts);
    deletePostHandler();
  } catch (error) {
    console.log(error);
    messageForUser("#postsContainer", "danger", error.message);
  }
}
