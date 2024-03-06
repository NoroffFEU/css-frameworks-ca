import * as storage from "../../storage/index.mjs";

export function handleLogout() {
  // Clear token and profile from storage
  storage.remove("token");
  storage.remove("profile");

  // Redirect to the login page
  window.location.href = "../../../index.html";
}
