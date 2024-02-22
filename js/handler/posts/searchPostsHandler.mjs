import { searchPosts } from "../../api/posts/index.mjs";
import { displayPostsHandler } from "./displayPostsHandler.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

export function searchPostsHandler() {
  // get the form
  const form = document.querySelector("#search-form");

  // add the event listener = "submit"
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // get the input value
    const searchTerm = form.querySelector(".search-form").value;

    // if the trimmed value is "" then return
    if (searchTerm.trim() === "") return;
    displayMessage(
      "#message",
      "warning",
      "Can't find what you're looking for? Try search for a tag."
    );

    // call the search api
    try {
      const results = await searchPosts(searchTerm);

      // if the response is ok then call the displayPost function
      displayPostsHandler(results);
      document.querySelector(".search-form").value = "";
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
