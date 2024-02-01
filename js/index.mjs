import { registerFormListener } from "./handler/register/index.mjs";
import { loginFormListener } from "./handler/login/index.mjs";
import { displayPostsHandler } from "./handler/posts/index.mjs";
import { createPost } from "./posts/create.mjs";
import { updatePost } from "./posts/update.mjs";


const path = location.pathname;

switch (path) {
  case '/':
  case '/index.html':
    loginFormListener();
    break;
  case '/create-account/index.html':
    registerFormListener();
    break;
  case "/feed/":
  case "/feed/index.html":
    displayPostsHandler();
    break;
  case "/createpost/":
  case "/createpost/index.html":
    createPost();
    break;
  case "/updatepost/":
  case "/updatepost/index.html":
    updatePost();
    break;
  default:
}