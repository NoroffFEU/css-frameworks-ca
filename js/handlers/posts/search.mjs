import { getPosts } from "../../api/posts/get.mjs";
import { renderPostTemplate } from "../../templates/index.mjs";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("button-search");

searchButton.addEventListener("click", async () => {
  // Get the search query entered by the user
  const searchQuery = searchInput.value.trim().toLowerCase();

  try {
    // Get all posts from the server
    const posts = await getPosts();

    // Filter posts based on the search query
    const filteredPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(searchQuery) ||
        post.title.toLowerCase().includes(searchQuery) ||
        post.author.name.toLowerCase().includes(searchQuery)
    );

    renderFilteredPosts(filteredPosts);
  } catch (error) {
    console.error("Error filtering posts by search:", error);
  }
});

function renderFilteredPosts(posts) {
  const postDisplayContainer = document.querySelector("#posts");
  postDisplayContainer.innerHTML = ""; // Clear existing posts

  posts.forEach((post) => {
    renderPostTemplate(post, postDisplayContainer);
  });
}
