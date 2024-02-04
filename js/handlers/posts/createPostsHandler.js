import { getAllPosts } from "../../api/posts/getAllPosts.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderPosts } from "../../ui/renderPosts.js";

export async function createPostsHandler() {
  try {
    // console.log("posts handler");
    const posts = await getAllPosts();
    renderPosts("#posts", posts);
    // filterPostsHandler(posts);
  } catch (error) {
    console.log(error);
    messageForUser("#posts", "danger", error.message);
  }
}
