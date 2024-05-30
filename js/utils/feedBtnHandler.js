import { toggleLoader } from "./spinner.js";
import { updatePostsSection } from "./updatePostsContainer.js";

/**
 * Handles a button click to display specific content on the feed page.
 *
 * This function is responsible for handling button clicks on the feed page. It toggles the button class, renders specific content based on the provided `renderFunction`, updates the posts section, and manages the loader state.
 *
 * @param {Function} renderFunction - The function responsible for rendering specific content.
 * @param {string} value - The value or parameter to pass to the `renderFunction`.
 * @param {string} id - The ID or identifier of the button to toggle its class.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const feedButton = document.querySelector("#followingBtn");
 * feedButton.addEventListener("click", () => feedBtnHandler(renderFollowers, "followers", "feedButton"));
 */
export const feedBtnHandler = (renderFunction, value, id) => {
  toggleBtnClass(id);
  renderFunction(value);
  updatePostsSection();
  toggleLoader("on");
};

/**
 * Toggles the "active" class on a specific button, making it visually active.
 *
 * This function is used to toggle the "active" class on a specific button within a button container, visually indicating that it's the currently active button while removing the "active" class from other buttons.
 *
 * @param {string} id - The ID of the button to make active.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const buttonId = "followersBtn";
 * toggleBtnClass(buttonId);
 */

const toggleBtnClass = (id) => {
  const btnContainer = document.getElementById("feed-btn-container");
  const btnArray = Object.values(btnContainer.children);
  btnArray.forEach((btn) => {
    if (btn.id === id) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
};
