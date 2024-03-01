import * as utils from "./utils/index.mjs";
import * as listeners from "./handlers/index.mjs";

// Add the code block here
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    listeners.setUpdatePostListener
  );
} else {
  listeners.setUpdatePostListener();
}

document.addEventListener("DOMContentLoaded", () => {
  if (utils.updateProfileFromLocalStorage) {
    utils.updateProfileFromLocalStorage();
  }

  if (utils.hamburger) {
    utils.hamburger();
  }
  const path = location.pathname;

  if (path === "/profile/login/index.html") {
    listeners.setLoginFormListener();
  } else if (path === "/profile/register/") {
    listeners.setRegisterFormListener();
  } else if (path === "/profile/index.html") {
    listeners.displayUserPosts();
    listeners.setCreatePostListener();
    listeners.modalEditPost();
  } else if (path === "/profile/edit/") {
    listeners.setUpdateProfileListener();
  } else if (path === "/feed/index.html") {
    listeners.displayPosts();
    listeners.setCreatePostListener();
    listeners.modalEditPost();
  }
});
