import { getQueryParamId } from "../utils/queryParam.js";

/**
 * Navigates to the page displaying a specific post with the given ID.
 *
 * This function checks if the current page already displays the post with the specified ID. If not, it navigates to the page displaying the post by updating the URL with the post's ID as a query parameter.
 *
 * @param {number} postId - The ID of the post to view.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const postId = 123; // Replace with the actual post ID to view
 * viewPost(postId);
 */

export const viewPost = (postId) => {
  const id = getQueryParamId();
  if (Number(id) === postId) {
    return;
  }

  window.location.href = `/feed/index.html?id=${postId}`;
};

/**
 * Adjusts the page content when the feed page displays a post with a specified id, by removing the create post container and adjusting the  height and padding of the main section
 *
 * @example
 * //Example usage
 * adjustingPageContent();
 */
export const adjustingPageContent = () => {
  const createPostContainer = document.querySelector(".create-post_container");
  createPostContainer.remove();

  const main = document.querySelector("main");
  main.style.minHeight = "100vh";
  main.style.paddingTop = "50px";
};
