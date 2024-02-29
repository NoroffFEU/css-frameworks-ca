import * as storage from "../../utils/storage/storage.js";

/**
 * Handles the logout button click.
 *
 * When the logout button is clicked, it confirms if the user wants to logout.
 * If the user confirms, it removes the user's token, name, and email from storage and redirects the user to the home page.
 */

export function logoutHandler() {
  const logoutButton = document.querySelector("#logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
}

function logout() {
  const doYouWantToLogout = confirm("Are you sure you want to logout?");
  if (doYouWantToLogout) {
    storage.removeMultiple(["token", "userName", "email"]);
    window.location.href = "/";
  }
}
