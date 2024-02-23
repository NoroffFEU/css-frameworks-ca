import { searchPosts } from "../../api/posts/index.mjs";
import { displayPostsHandler } from "./displayPostsHandler.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";
// import { renderAllPosts } from "../../templates/renderAllPosts.mjs";

export function searchPostsHandler() {
  // get the form
  const form = document.querySelector("#searchForm");

  // add the event listener = "submit"
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // get the input value
    const searchTerm = document.querySelector("#search").value.trim();

    // if the trimmed value is "" then return
    if (searchTerm.trim() === "") return;
    displayMessage(
      "#message",
      "warning",
      "Can't find what you're looking for? Try searching for a tag."
    );

    // call the search api
    try {
      const results = await searchPosts(searchTerm);
      // should this container be in the displayPostsHandler with the #card?
      const container = document.querySelector("#card");
      console.log(`Search term: ${searchTerm}, Results:`, results); // This will log the search term and the results

      // if the response is ok then call the displayPost function
      displayPostsHandler(results, container);

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

//  Tried to use renderAllPosts but it's not working properly
// const results = await searchPosts(searchTerm);
// renderAllPosts(results);

// document.querySelector("#search").value = "";
