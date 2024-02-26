import * as templates from "./templates/index.mjs";
import * as postsMethods from "./api/posts/index.mjs";
import * as utils from "./utils/index.mjs";
import * as listeners from "./handlers/index.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname;
  console.log(path);

  if (path === "/profile/login/index.html") {
    listeners.setLoginFormListener();

  } else if (path === "/profile/register/") {
    listeners.setRegisterFormListener();
  } else if (path === "/profile/edit/") {
    listeners.setUpdateProfileListener();
 
  } else if (path === "/feed/index.html") {
    listeners.displayPosts();
    listeners.setCreatePostListener();
    listeners.setUpdatePostListener();
}

 
  utils.updateProfileFromLocalStorage();
});
