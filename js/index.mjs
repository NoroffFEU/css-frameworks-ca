import { loginFormListener } from "./handler/login/index.mjs";
import { registerFormListener } from "./handler/register/index.mjs";
import { createPostFormListener } from "./handler/posts/index.mjs";
import { displayPostsHandler } from "./handler/posts/index.mjs";
import { updatePostFormListener } from "./handler/posts/index.mjs";

function router() {
  const path = location.pathname;
  console.log(path);

  switch (path) {
    case "/":
    case "/index.html":
      loginFormListener();
      break;
    case "/create-account/":
    case "/create-account/index.html":
      registerFormListener();
      break;
    case "/feed/post/":
    case "/feed/post/index.html":
      createPostFormListener();
      displayPostsHandler();
      break;
    case "/feed/edit/":
    case "/feed/edit/index.html":
      updatePostFormListener();
      break;
    default:
  }
}

router();
