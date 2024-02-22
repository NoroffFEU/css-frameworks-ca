import { getPost } from "../api/posts/getPost.mjs";
import * as storage from "../handler/storage.mjs";

async function displayPostById(id) {
  try {
    const post = await getPost(id);

    // Create HTML elements to display the post data
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.dataset.userId = post.userId;

    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title;
    postElement.appendChild(titleElement);

    const bodyElement = document.createElement("p");
    bodyElement.textContent = post.body;
    postElement.appendChild(bodyElement);

    // Append the post element to the container
    const container = document.querySelector("#post-container");
    container.appendChild(postElement);
  } catch (error) {
    console.error("Failed to display post:", error);
  }
}
