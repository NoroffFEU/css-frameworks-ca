import { renderAllPosts } from "../../templates/index.mjs";

/**
 * Sorts the posts by date and renders them.
 * If the selected option is "newest", it sorts the posts from newest to oldest.
 * If the selected option is "oldest", it sorts the posts from oldest to newest.
 * If the posts parameter is not an array, it logs an error and returns.
 *
 * @param {Array} posts - The posts to sort and render.
 * @param {string} selectedOption - The selected sorting option ("newest" or "oldest").
 */

export function handlePostDate(posts, selectedOption) {
  if (!Array.isArray(posts)) {
    console.error("TypeError: Expected 'posts' to be an array.");
    return;
  }

  let sortedPosts = [...posts];
  if (selectedOption === "newest") {
    sortedPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
  } else if (selectedOption === "oldest") {
    sortedPosts.sort((a, b) => new Date(a.created) - new Date(b.created));
  }
  renderAllPosts(sortedPosts);
}
