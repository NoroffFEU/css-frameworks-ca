import { dateSortingHandler } from "../../handlers/posts/dateSortingHandler.js";

/**
 * Attaches an event listener to the sorting select element,
 * which sorts posts based on the selected option.
 *
 * @param {Array<Object>} posts - The posts to be sorted when the select option changes.
 */

export async function getSortedPosts(posts) {
  const sortingSelect = document.querySelector("#sorting");

  sortingSelect.addEventListener("change", async function () {
    const selectedOption = sortingSelect.value;
    console.log(selectedOption);
    dateSortingHandler(posts, selectedOption);
  });
}
