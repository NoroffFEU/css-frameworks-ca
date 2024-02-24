import { searchPosts } from "../../api/posts/index.mjs";
import { renderAllPosts } from "../../templates/renderAllPosts.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

export function searchPostsHandler() {
  // get the form
  const form = document.querySelector("#searchForm");

  // add the event listener = "submit"
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // get the input value
    const searchTerm = document.querySelector("#search").value.trim();

    // if the trimmed value is "" then return
    if (searchTerm === "") return;

    // call the search api
    try {
      const results = await searchPosts(searchTerm);

      const container = document.querySelector("#card");
      renderAllPosts(results, container);
      document.querySelector("#search").value = "";
    } catch (error) {
      // else throw an error
      console.error("Error searching posts:", error);
      displayMessage(
        "#message",
        "danger",
        "Something went wrong trying to sort the posts."
      );
    }
  });
}
