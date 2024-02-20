import { renderProfilePosts } from "../../templates/index.mjs";
import * as postMethods from "../../api/posts/index.mjs";
import { getUserName } from "../storage.mjs";

export async function displayProfilePostHandler() {
  const username = getUserName();
  console.log(username);
  const posts = await postMethods.getProfilePosts(username);
  const container = document.querySelector("#card");

  renderProfilePosts(posts, container);
}
