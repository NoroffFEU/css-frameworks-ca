/**
 * Changes the search elements based on if the pages content
 *
 * This function checks if the page has a container with the class "userCardsContainer", if true it removes the filter options for the posts. If false it means the page is display posts, and  will again display the filter options
 *
 * @example
 * //Example usage
 * changeSearchElements();
 */

export const changeSearchElements = () => {
  const userContainer = document.getElementById("userCardsContainer");
  const postDropdown = document.getElementById("post-dropdown");

  if (userContainer) {
    postDropdown.style.display = "none";
  } else {
    postDropdown.style.display = "block";
  }
};
