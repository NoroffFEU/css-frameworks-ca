import { registerFormHandler } from "./handlers/authorization/registerFormHandler.js";
import { loginFormHandler } from "./handlers/authorization/loginFormHandler.js";
import { logoutHandler } from "./handlers/authorization/logoutHandler.js";

document.getElementById("createNewAccount").addEventListener("click", function () {
  registerFormHandler();
});

function route() {
  const path = window.location.pathname;
  console.log(path);

  switch (path) {
    case "/":
      loginFormHandler();
      break;
    case "/profile":
      logoutHandler();
      break;
    case "/feed":
      logoutHandler();
      break;
  }
}

route();
