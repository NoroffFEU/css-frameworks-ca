// DENNE ER NY

import { registerFormListener } from "./handler/register/index.mjs";
import { loginFormListener } from "./handler/login/index.mjs";

const path = location.pathname;

if (path === '/index.html' || path === '/') {
  loginFormListener();
} else if (path === '/create-account/index.html') {
  registerFormListener();
} else {
  console.error(`There seems to be issues with path: ${path}`);
}