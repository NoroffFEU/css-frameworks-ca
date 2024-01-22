// DENNE ER NY ETTER Å FØLGE OLIVER PÅ YOUTUBE

import { registerFormListener } from "./handler/register/index.mjs";
import { loginFormListener } from "./handler/login/index.mjs";

const path = location.pathname;

if (path === '/index.html') {
  loginFormListener();
} else if (path === '/create_account/index.html') {
  registerFormListener();
}