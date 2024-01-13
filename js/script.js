import { registerFormHandler } from "./handlers/authorization/registerFormHandler.js";
import { loginFormHandler } from "./handlers/authorization/loginFormHandler.js";

document.getElementById("createNewAccount").addEventListener("click", function () {
  registerFormHandler();
});

loginFormHandler();
