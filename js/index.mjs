import { registerFormListener } from "./handler/register/index.mjs";
import { loginFormListener } from "./handler/login/index.mjs";

import { createPost } from "./posts/create.mjs";

const path = location.pathname;

switch (path) {
  case '/index.html':
  case '/':
    loginFormListener();
    break;
  case '/create-account/index.html':
    registerFormListener();
    break;
  default:
}

createPost({
  
  title: "My first post YOYO",
  body: "This is my YOYO",
})