import { registerFormHandler } from "./handlers/authorization/registerFormHandler.js";
import { loginFormHandler } from "./handlers/authorization/loginFormHandler.js";
import { logoutHandler } from "./handlers/authorization/logoutHandler.js";
import { displayPostsHandler } from "./handlers/posts/displayPostsHandler.js";
import { displaySinglePostHandler } from "./handlers/posts/displaySinglePostHandler.js";
import { displayProfilePostsHandler } from "./handlers/posts/displayProfilePostsHandler.js";
import { displaySingleProfilePostHandler } from "./handlers/posts/displaySingleProfilePostHandler.js";
import { handleScrollButton } from "./handlers/posts/handleScrollButton.js";
import { addPostHandler } from "./handlers/posts/addPostHandler.js";
import { searchPostsHandler } from "./handlers/posts/searchPostsHandler.js";
import { sortingPostsHandler } from "./handlers/posts/sortingPostsHandler.js";
import { editPostHandler } from "./handlers/posts/editPostHandler.js";
import { displayUserName } from "./ui/displayUserName.js";

/**
 * Routes the application based on the current URL path.
 *
 * It retrieves the current URL path and calls the appropriate handlers based on the path.
 * If the path is "/", "/index.html", it registers the form handler and login form handler.
 * If the path is "/profile/", "/profile/index.html", it displays the user name, logout handler, displays profile posts handler, adds post handler, and handles the scroll button.
 * If the path is "/profile/post.html", it displays the single profile post handler and logout handler.
 * If the path is "profile/edit-post.html", it logs out handler and edits post handler.
 * If the path is "/feed/", "/feed/index.html", it handles the scroll button, logout handler, displays posts handler, searches posts handler, and sorts posts handler.
 * If the path is "/feed/post.html", it does not do anything.
 */

function route() {
  const path = window.location.pathname;
  console.log(path);

  switch (path) {
    case "/":
    case "/index.html":
      registerFormHandler();
      loginFormHandler();
      break;
    case "/profile/":
    case "/profile/index.html":
      displayUserName();
      logoutHandler();
      displayProfilePostsHandler();
      addPostHandler();
      handleScrollButton();
      break;
    case "/profile/post.html":
      displaySingleProfilePostHandler();
      logoutHandler();
      break;
    case "profile/edit-post.html":
      logoutHandler();
      editPostHandler();
    case "/feed/":
    case "/feed/index.html":
      handleScrollButton();
      logoutHandler();
      displayPostsHandler();
      searchPostsHandler(posts);
      sortingPostsHandler();
      break;
    case "/feed/post.html":
      displaySinglePostHandler();
      logoutHandler();
      break;
    default:
  }
}

route();
