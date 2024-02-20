import { renderProfilePosts } from "../../templates/index.mjs";
import * as postMethod from "../../api/posts/index.mjs";
import { getUserName } from "../storage.mjs";

export async function displayProfilePostHandler() {
  const username = getUserName();
  const posts = await postMethod.getPost();
  const userPosts = posts.filter((post) => post.author.name === username);
  const container = document.querySelector("#card");
  renderProfilePosts(userPosts, container);
}

displayProfilePostHandler();
