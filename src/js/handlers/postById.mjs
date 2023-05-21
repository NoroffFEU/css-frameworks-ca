import { getPost } from "../api/posts/read.mjs";
import { postTemplate } from "../templates/post.mjs";

/**
 * @description This function retrieves the ID of the post from the URL parameters, retrieves the post data using
 */
export async function displayPostById() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  const postData = await getPost(postId);

  const container = document.querySelector("#postId-container");
  const postElement = postTemplate(postData);

  container.appendChild(postElement);
}
