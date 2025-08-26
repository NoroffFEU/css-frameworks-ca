import { renderPosts } from "../../ui/renderPosts.js";

/**
 * Sorts the posts based on the selected option and renders them.
 * This function first validates if the provided 'posts' argument is an array.
 * If 'posts' is not an array, it logs an error and halts execution.
 * Otherwise, it sorts the posts array in-place based on the 'selectedOption':
 * - If 'selectedOption' is "newest", posts are sorted by the 'created' date in descending order.
 * - If 'selectedOption' is "oldest", posts are sorted by the 'created' date in ascending order.
 * After sorting, it calls 'renderPosts' to update the UI with the sorted posts.
 *
 * @param {Array<Object>} posts - The posts to sort. Each post must have a 'created' date property.
 * @param {string} selectedOption - The selected sorting option. Can be "newest" or "oldest".
 */

export function dateSortingHandler(posts, selectedOption) {
  if (!Array.isArray(posts)) {
    console.error("Invalid argument: posts must be an array");
    return;
  }

  let sortedPosts = [...posts];
  if (selectedOption === "newest") {
    sortedPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
  } else if (selectedOption === "oldest") {
    sortedPosts.sort((a, b) => new Date(a.created) - new Date(b.created));
  }
  renderPosts("#posts", sortedPosts);
}
