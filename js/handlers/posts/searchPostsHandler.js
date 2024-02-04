import { searchPosts } from "../../api/posts/searchPosts.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderPosts } from "../../ui/renderPosts.js";

export function searchPostsHandler() {
  const searchForm = document.querySelector("#searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const searchInput = document.querySelector("#search").value.trim();
      if (searchInput === "") {
        messageForUser(
          "#messageForUser",
          "warning",
          "Please type something into the search box to find what you're looking for."
        );
        return;
      }

      try {
        const posts = await searchPosts(searchInput);
        renderPosts("#posts", posts);
        document.querySelector("#search").value = "";
      } catch (error) {
        console.error("Search failed:", error);
        messageForUser(
          "#messageForUser",
          "danger",
          "No posts found with the provided tag. Try searching for something else."
        );
      }
    });
  }
}
