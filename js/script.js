import { registerFormHandler } from "./handlers/authorization/registerFormHandler.js";
import { loginFormHandler } from "./handlers/authorization/loginFormHandler.js";
import { logoutHandler } from "./handlers/authorization/logoutHandler.js";
import { createPostsHandler } from "./handlers/posts/createPostsHandler.js";

function route() {
  const path = window.location.pathname;
  console.log(path);

  // document.getElementById("createNewAccount").addEventListener("click", function () );

  switch (path) {
    case "/":
    case "/index.html":
      registerFormHandler();
      loginFormHandler();
      break;
    case "/profile/":
      logoutHandler();
      // add posts handler with user id. where user can add, edit, delete posts
      break;
    case "/feed/":
    case "/feed/index.html":
      logoutHandler();
      // add posts handler
      createPostsHandler();
      break;
    default:
  }
}

route();
