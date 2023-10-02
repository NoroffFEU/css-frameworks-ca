import { API_BASE_URL } from "./const.mjs";
import { fetchAllUserPosts } from "./feedposts.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  //   console.log("DOMContentLoaded event listener added");
  searchBar.addEventListener("input", searchPosts);
  //   console.log("Input event listener added");

  const allPosts = `${API_BASE_URL}social/posts?&_comments=true&_author=true&_reactions=true&_count=true`;
  fetchAllUserPosts(allPosts);
});

async function searchPosts() {
  //   console.log("Search input event triggered");
  const searchInput = document.getElementById("searchBar").value.toLowerCase();
  //   console.log("Search input:", searchInput);
  const postCards = document.querySelectorAll(".card");

  postCards.forEach((postCard) => {
    const postTitleElement = postCard.querySelector(".postTitle");
    const postBodyElement = postCard.querySelector(".postBody");

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
