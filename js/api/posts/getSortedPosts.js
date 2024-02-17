import { dateSortingHandler } from "../../handlers/posts/dateSortingHandler.js";

/**
 * Adds an event listener to the sorting select element to sort posts.
 *
 * @param {Array<Object>} posts - The posts to sort.
 */

export async function getSortedPosts(posts) {
  const sortingSelect = document.querySelector("#sorting");

  sortingSelect.addEventListener("change", async function () {
    const selectedOption = sortingSelect.value;
    console.log(selectedOption);
    dateSortingHandler(posts, selectedOption);
  });
}
