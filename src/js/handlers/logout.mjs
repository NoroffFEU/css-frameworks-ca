import * as storage from "../storage/index.mjs";

export function logoutListener() {
  const logoutButton = document.getElementById("logout-button");

  logoutButton.addEventListener("click", () => {
    storage.remove("token");
    storage.remove("profile");
    window.location.href = "profil/login/index.html";
  });
}
