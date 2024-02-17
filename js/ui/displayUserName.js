import { getUserName } from "../utils/helpers/getUserName.js";

/**
 * Displays the user's name.
 *
 * It retrieves the user's name and displays it in the ".your-profile-name" element.
 * If the user's name is not found, it logs a message to the console.
 */

document.addEventListener("DOMContentLoaded", () => {
  displayUserName();
});

export function displayUserName() {
  const userName = getUserName();
  if (userName) {
    document.querySelector(".your-profile-name").textContent = userName;
  } else {
    console.log("User name not found in storage.");
  }
}
