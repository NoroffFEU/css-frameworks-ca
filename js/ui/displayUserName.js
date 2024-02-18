import { getUserName } from "../utils/helpers/getUserName.js";

/**
 * Displays the user's name.
 *
 * It retrieves the user's name and displays it in the ".your-profile-name" element.
 * If the user's name is not found, it logs a message to the console.
 */

export function displayUserName() {
  const userName = getUserName();
  if (userName) {
    const userNameElement = document.querySelector(".your-profile-name");
    if (userNameElement) {
      userNameElement.textContent = userName;
    } else {
      console.error("Element with class .your-profile-name not found");
    }
  } else {
    console.log("User name not found in storage.");
  }
}
