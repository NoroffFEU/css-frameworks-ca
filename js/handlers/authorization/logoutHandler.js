import * as storage from "../../utils/storage/storage.js";

export function logoutHandler() {
  const logoutButton = document.querySelector("#logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
}

function logout() {
  const doYouWantToLogout = confirm("Are you sure you want to logout?");
  if (doYouWantToLogout) {
    storage.removeMultiple(["token", "name", "email"]);
    // storage.remove("token");
    // storage.remove("name");
    // storage.remove("email");
    window.location.href = "/";
  }
}
