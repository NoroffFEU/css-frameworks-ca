import { registerFormHandler } from "./handlers/authorization/registerFormHandler.js";
import { loginFormHandler } from "./handlers/authorization/loginFormHandler.js";
import { logoutHandler } from "./handlers/authorization/logoutHandler.js";

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
      logoutHandler();
      // add posts handler
      break;
    default:
  }
}

route();
