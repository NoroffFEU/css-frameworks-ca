import { feedContainer } from "./filter.mjs";
import { postsHtml, postsContentContainer } from "./view-feed-posts.mjs";

const posts = JSON.parse(localStorage.getItem("currentPosts"));

function search(param) {
  const filteredPosts = posts.filter((post) => {
    if (post.body !== null && post.title !== null) {
      if (post.title.toLowerCase().includes(param) || post.body.toLowerCase().includes(param) || post.tags.join(" ").toLowerCase().includes(param)) {
        return post;
      }
    }
  });
  return filteredPosts;
}

const searchInput = document.querySelector(".search-form");
function getSearchResults() {
  searchInput.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchValue = event.target.search.value.toLowerCase();
    const results = search(searchValue);
    const numberOfResults = results.length;
    searchInput.reset();

    postsContentContainer.innerHTML = "";
    feedContainer.classList.add("text-dark", "fs-3");
    feedContainer.innerHTML = `
      ${numberOfResults} Posts found from your search.
      <button id="showAllFeeds" class="btn btn-dark">Back to feed</button>
    `;

    postsHtml(results);
    document.getElementById("showAllFeeds").addEventListener("click", function () {
      location.reload();
    });
  });
}

export { search, getSearchResults };
