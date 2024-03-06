import * as utils from "./utils/index.mjs";
import * as listeners from "./handlers/index.mjs";
import { handleLogout } from "./handlers/index.mjs";

// Add the code block here
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    listeners.setUpdatePostListener
  );
} else {
  listeners.setUpdatePostListener();
}

document.addEventListener("DOMContentLoaded", async () => {
  if (utils.updateProfileFromLocalStorage) {
    utils.updateProfileFromLocalStorage();
  }

  const path = location.pathname;

  if (path === "/profile/login/") {
    listeners.setLoginFormListener();
  } else if (path === "/profile/register/") {
    listeners.setRegisterFormListener();
  } else if (path === "/profile/") {
    listeners.displayUserPosts();
    listeners.setCreatePostListener();
    listeners.modalEditPost();
  } else if (path === "/profile/edit/") {
    listeners.setUpdateProfileListener();
  } else if (path === "/feed/") {
    listeners.displayPosts();
    listeners.setCreatePostListener();
    listeners.modalEditPost();
    listeners.handleSortOptionChange();
  }
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", handleLogout);
  }
});
