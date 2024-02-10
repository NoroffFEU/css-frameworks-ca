import { getProfilePosts } from "../../api/posts/getProfilePosts.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderProfilePosts } from "../../ui/renderProfilePosts.js";
import { getUserName } from "../../utils/helpers/getUserName.js";
import { deletePostHandler } from "./deletePostHandler.js";

export async function displayProfilePostsHandler() {
  try {
    console.log("posts handler");
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
