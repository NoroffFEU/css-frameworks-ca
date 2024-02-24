import { searchPosts } from "../../api/posts/index.mjs";
import { renderAllPosts } from "../../templates/renderAllPosts.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

/**
 * Handles the search form submission event.
 *
 * When the form is submitted, it prevents the default form submission, clears any previous error message,
 * gets the search term from the input field, and calls the `searchPosts` API with the search term.
 *
 * If the search term is empty, it returns early.
 *
 * If the `searchPosts` API returns null or an empty array, it displays a warning message and returns early.
 *
 * If the `searchPosts` API returns an array of posts, it renders the posts in the container element.
 *
 * If an error occurs during the process, it logs the error and displays an error message.
 *
 * @function searchPostsHandler
 * @async
 */

export function searchPostsHandler() {
  const form = document.querySelector("#searchForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    displayMessage("#message", "", "");

    const searchTerm = document.querySelector("#search").value.trim();

    if (searchTerm === "") return;

    try {
      const results = await searchPosts(searchTerm);

      if (!results || results.length === 0) {
        displayMessage(
          "#message",
          "warning",
          "No posts found for your search term."
        );
        return;
      }

      const container = document.querySelector("#card");
      renderAllPosts(results, container);
      document.querySelector("#search").value = "";
    } catch (error) {
      console.error("Error searching posts:", error);
      displayMessage(
        "#message",
        "danger",
        "Something went wrong trying to get the posts."
      );
    }
  });
}
