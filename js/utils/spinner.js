/**
 * Toggles the display of a loader/spinner element.
 *
 * This function controls the visibility of a loader/spinner element by changing its display style property. If the `value` parameter is true, the loader is displayed (block), otherwise, it's hidden (none).
 *
 * @param {boolean} value - Whether to show (true) or hide (false) the loader.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * // To show the loader:
 * toggleLoader(true);
 *
 * // To hide the loader:
 * toggleLoader(false);
 */
export const toggleLoader = (value) => {
  const loader = document.querySelector(".spinner-container");
  if (value) {
    loader.style.display = "block";
  } else {
    loader.style.display = "none";
  }
};
