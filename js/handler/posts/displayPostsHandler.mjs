import { renderAllPosts } from "../../templates/index.mjs";
import * as postMethod from "../../api/posts/index.mjs";

export async function displayPostsHandler() {
  const posts = await postMethod.getAllPosts();
  const container = document.querySelector("#card");
  renderAllPosts(posts, container);
}

displayPostsHandler();
