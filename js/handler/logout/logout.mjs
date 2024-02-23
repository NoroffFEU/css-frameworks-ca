import * as storage from "../../handler/storage.mjs";

/**
 * Attaches a click event listener to the logout button.
 * When the button is clicked, it calls the `logout` function.
 */
export function logoutHandler() {
  const logoutBtn = document.querySelector("#logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
}

/**
 * Logs out the user.
 * It asks the user to confirm the logout. If the user confirms, it removes the user's data from storage and redirects to the home page.
 */
function logout() {
  const confirmLogout = confirm("Do you want to logout?");
  if (confirmLogout) {
    storage.removeMultiple(["username", "email", "token"]);
    window.location.href = "/";
  }
}
