import { registerFormHandler } from "./handlers/authorization/registerFormHandler.js";
import { loginFormHandler } from "./handlers/authorization/loginFormHandler.js";
import { logoutHandler } from "./handlers/authorization/logoutHandler.js";

function route() {
  const path = window.location.pathname;
  console.log(path);

  switch (path) {
    case "/":
    case "/index.html":
      document.getElementById("createNewAccount").addEventListener("click", function () {
        try {
          registerFormHandler();
          loginFormHandler();
        } catch (error) {
          console.log(error);
        }
      });
      break;
    case "/profile/":
      logoutHandler();
      break;
    case "/feed/":
      logoutHandler();
      break;
  }
}

route();
