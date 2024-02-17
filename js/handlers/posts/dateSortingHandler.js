import { renderPosts } from "../../ui/renderPosts.js";

/**
 * Sorts the posts based on the selected option and renders them.
 *
 * @param {Array<Object>} posts - The posts to sort.
 * @param {string} selectedOption - The selected sorting option. Can be "newest" or "oldest".
 */

export function dateSortingHandler(posts, selectedOption) {
  if (!Array.isArray(posts)) {
    console.error("Invalid argument: posts must be an array");
  }

  let sortedPosts = [...posts];
  if (selectedOption === "newest") {
    sortedPosts = posts.sort((a, b) => new Date(b.created) - new Date(a.created));
  } else if (selectedOption === "oldest") {
    sortedPosts = posts.sort((a, b) => new Date(a.created) - new Date(b.created));
  }
  renderPosts("#posts", sortedPosts);
}
