import * as storage from "../../handler/storage.mjs";

export function logoutHandler() {
  const logoutBtn = document.querySelector("#logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
}

function logout() {
  const confirmLogout = confirm("Do you wan to logout?");
  if (confirmLogout) {
    storage.removeMultiple(["username", "email", "token"]);
    window.location.href = "/";
  }
}
