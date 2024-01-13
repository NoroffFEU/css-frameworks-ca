import { registerFormHandler } from "./handlers/authorization/registerFormHandler.js";
import { loginFormHandler } from "./handlers/authorization/loginFormHandler.js";

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
      // case "/register":
      //   registerFormHandler();
      //   break;
      // default:
      break;
  }
}

route();
