import { API_BASE_URL } from "./const.mjs";
import { fetchAllUserPosts } from "./feedposts.js";
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar"); // Use getElementById
  console.log("DOMContentLoaded event listener added"); // Debugging
  searchBar.addEventListener("input", searchPosts);
  console.log("Input event listener added"); // Debugging

  const allPosts = `${API_BASE_URL}social/posts?_author=true`;
  fetchAllUserPosts(allPosts);
});

async function searchPosts() {
  console.log("Search input event triggered"); // Debugging
  const searchInput = document.getElementById("searchBar").value.toLowerCase(); // Use getElementById
  console.log("Search input:", searchInput); // Debugging
  const postCards = document.querySelectorAll(".card");

  postCards.forEach((postCard) => {
    const postTitleElement = postCard.querySelector(".fw-bolder");
    const postBodyElement = postCard.querySelector(".fs-4");

    if (postTitleElement && postBodyElement) {
      const postTitle = postTitleElement.textContent.toLowerCase();
      const postBody = postBodyElement.textContent.toLowerCase();

      if (postTitle.includes(searchInput) || postBody.includes(searchInput)) {
        postCard.style.display = "block";
      } else {
        postCard.style.display = "none";
      }
    }
  });
}
