import { loginFormListener } from "./handler/login/index.mjs";
import { registerFormListener } from "./handler/register/index.mjs";
import { createPostFormListener } from "./handler/posts/index.mjs";
import { displayPostsHandler } from "./handler/posts/index.mjs";
import { updatePostFormListener } from "./handler/posts/index.mjs";
import { logoutHandler } from "./handler/logout/logout.mjs";
import { displayProfilePostHandler } from "./handler/posts/index.mjs";
import { removePostsHandler } from "./handler/posts/index.mjs";
import { handleEditForm } from "./handler/posts/handleEditForm.mjs";


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
    case "/feed/posts/":
    case "/feed/posts/index.html":
      createPostFormListener();
      displayPostsHandler();
      logoutHandler();
      break;
    case "/feed/edit/":
    case "/feed/edit/index.html":
      createPostFormListener();
      updatePostFormListener();
      logoutHandler();
      break;
    case "/profile/":
    case "/profile/index.html":
      logoutHandler();
      updatePostFormListener();
      displayProfilePostHandler();
      removePostsHandler();
      // handlePostSort();
      break;
    case "/profile/edit.html":
      handleEditForm();
      break;

    default:
  }
}

router();
