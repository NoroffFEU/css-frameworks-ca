import { renderPosts } from "../render/render.js";
import { updatePostsSection } from "./updatePostsContainer.js";
import { apiUrls } from "../api/constant.js";
import { apiCall } from "../api/api.js";

const newestPostsBtn = document.getElementById("newestPosts");
const updatedPostsBtn = document.getElementById("updatedPosts");
const oldestPostsBtn = document.getElementById("oldestPosts");
const activePostsBtn = document.getElementById("activePosts");

/**
 * Sets up event listeners to filter and display posts based on different criteria.
 *
 * This function sets up event listeners on various buttons to allow users to filter and display posts based on different criteria, such as newest, oldest, updated, and active posts.
 *
 * @param {Array} posts - An array of posts to be filtered and displayed.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const posts = fetchPosts();
 * filterPosts(posts);
 */

export const filterPosts = (posts) => {
  newestPostsBtn.addEventListener("click", (e) => displayNewestPosts(posts));
  oldestPostsBtn.addEventListener("click", (e) => displayOldestPosts(posts));
  updatedPostsBtn.addEventListener("click", (e) => displayUpdatedPosts(posts));
  activePostsBtn.addEventListener("click", (e) => displayActivePosts());
};

/**
 * Displays the newest posts by sorting and rendering them.
 *
 * This function sorts the provided array of posts in descending order by their creation date, making the newest posts appear first. It then updates the posts section and renders the sorted posts on the page.
 *
 * @param {Array} posts - An array of posts to be sorted and displayed.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const posts = fetchPosts();
 * displayNewestPosts(posts);
 */

const displayNewestPosts = (posts) => {
  const newestPosts = posts.sort((a, b) => new Date(b.created) - new Date(a.created));
  updatePostsSection();

  renderPosts(newestPosts);
};

/**
 * Displays the oldest posts by sorting and rendering them.
 *
 * This function sorts the provided array of posts in ascending order by their creation date, making the oldest posts appear first. It then updates the posts section and renders the sorted posts on the page.
 *
 * @param {Array} posts - An array of posts to be sorted and displayed.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const posts = fetchPosts();
 * displayOldestPosts(posts);
 */

const displayOldestPosts = (posts) => {
  const oldestPosts = posts.sort((a, b) => new Date(a.created) - new Date(b.created));
  updatePostsSection();
  renderPosts(oldestPosts);
};

/**
 * Displays the posts sorted by most recent updates and renders them.
 *
 * This function sorts the provided array of posts in descending order based on their last update timestamp, making the posts with the most recent updates appear first. It then updates the posts section and renders the sorted posts on the page.
 *
 * @param {Array} posts - An array of posts to be sorted and displayed.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const posts = fetchPosts();
 * displayUpdatedPosts(posts);
 */
const displayUpdatedPosts = (posts) => {
  const updatedPosts = posts.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  updatePostsSection();
  renderPosts(updatedPosts);
};
/**
 * Displays active posts and renders them on the page.
 *
 * This function fetches active posts from the specified API endpoint, updates the posts section, and renders the fetched active posts on the page.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * displayActivePosts();
 */

const displayActivePosts = async () => {
  const activePosts = await apiCall(apiUrls.active_Posts_Url, "get");
  console.log(activePosts);
  updatePostsSection();
  renderPosts(activePosts);
};
