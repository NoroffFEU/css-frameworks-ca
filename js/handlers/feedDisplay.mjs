import { getPosts } from "../api/posts/get.mjs";
import { renderPostTemplate } from "../templates/post.mjs";


export async function displayPosts() {
  try {
    const posts = await getPosts();
    const container = document.querySelector("#posts");
    container.innerHTML = ""; // Clear the existing content
    posts.forEach((postData) => {
      renderPostTemplate(postData, container);
    });
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}