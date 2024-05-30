import { displayPosts } from "../posts/displayPosts.js";

/**
 * Clears the posts container and optionally displays posts or other content.
 *
 * This function clears the content of the posts container, setting its inner HTML to an empty string. It can also be used to trigger the display of posts or other content after a short delay. Optionally, you can provide a `value` and `url` to specify what content to display.
 *
 * @param {string} [value] - Optional. The type of content to display (e.g., "posts").
 * @param {string} [url] - Optional. The URL for fetching specific content.
 * @returns {void}
 *
 * @example
 * // Example usage to clear the posts container:
 * updatePostsSection();
 *
 * // Example usage to display posts after clearing:
 * updatePostsSection("posts", "https://example.com/api/posts");
 */
export const updatePostsSection = (value, url) => {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = ``;
  postsContainer.style.minHeight = "100vh";

  setTimeout(() => {
    if (value === "posts") {
      displayPosts(url);
    }
    scrollToPosts();
  }, 500);
};

/**
 * Scrolls the page to the posts search section.
 *
 * This function scrolls the page to the posts search section, bringing it into view for the user.
 *
 * @returns {void}
 *
 * @example
 * // Example usage to scroll to the posts search section:
 * scrollToPosts();
 */
const scrollToPosts = () => {
  const postsSearchSection = document.getElementById("posts-search_container");
  postsSearchSection.scrollIntoView();
};
