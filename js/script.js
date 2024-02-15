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
