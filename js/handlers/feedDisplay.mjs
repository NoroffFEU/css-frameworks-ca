import { getPosts } from "../api/posts/get.mjs";
import { renderPostTemplates } from "../templates/post.mjs";

export async function displayPosts() {
  try {
    const posts = await getPosts();
    const container = document.querySelector("#posts");
    container.innerHTML = ""; // Clear the existing content
    renderPostTemplates(posts, container);
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}
