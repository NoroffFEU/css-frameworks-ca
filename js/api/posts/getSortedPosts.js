import { dateSortingHandler } from "../../handlers/posts/dateSortingHandler.js";

export async function getSortedPosts(posts) {
  const sortingSelect = document.querySelector("#sorting");
  // Add an event listener
  sortingSelect.addEventListener("change", async function () {
    // Get the selected option
    const selectedOption = sortingSelect.value;
    console.log(selectedOption);
    dateSortingHandler(posts, selectedOption);
  });
}
