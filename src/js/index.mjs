//Functions
import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";

const path = location.pathname;

if (path === "/profil/login/index.html") {
  setloginFormListener();
} else if (path === "/profil/register/index.html") {
  setRegisterFormListener();
}
