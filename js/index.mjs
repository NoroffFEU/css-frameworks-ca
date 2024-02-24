import { loginFormListener } from "./handler/login/index.mjs";
import { registerFormListener } from "./handler/register/index.mjs";
import { createPostFormListener } from "./handler/posts/index.mjs";
import { displayPostsHandler } from "./handler/posts/index.mjs";
import { updatePostFormListener } from "./handler/posts/index.mjs";
import { logoutHandler } from "./handler/logout/logout.mjs";
import { displayProfilePostHandler } from "./handler/posts/index.mjs";
import { removePostsHandler } from "./handler/posts/index.mjs";
import { handleEditForm } from "./handler/posts/handleEditForm.mjs";
import { searchPostsHandler } from "./handler/posts/index.mjs";
import { displayPostHandler } from "./handler/posts/index.mjs";

/**
 * Routes the application based on the current path.
 *
 * Depending on the current path, different event listeners are added to handle
 * user interactions. For example, on the login page, a listener is added to handle
 * the login form submission. On the posts page, listeners are added to handle
 * creating, displaying, and searching for posts.
 */

function router() {
  const path = location.pathname;
  // console.log(path);

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
      searchPostsHandler();
      logoutHandler();
      break;
    case "/feed/posts/post.html":
      displayPostHandler();
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
      break;
    case "/profile/edit.html":
      handleEditForm();
      break;

    default:
  }
}

router();
