import { registerFormHandler } from "./handlers/authorization/registerFormHandler.js";
import { loginFormHandler } from "./handlers/authorization/loginFormHandler.js";
import { logoutHandler } from "./handlers/authorization/logoutHandler.js";
import { createPostsHandler } from "./handlers/posts/createPostsHandler.js";
import { createSinglePostHandler } from "./handlers/posts/createSinglePostHandler.js";
import { createProfilePostsHandler } from "./handlers/posts/createProfilePostsHandler.js";
import { handleScrollButton } from "./handlers/posts/handleScrollButton.js";
import { addPostHandler } from "./handlers/posts/addPostHandler.js";
import { searchPostsHandler } from "./handlers/posts/searchPostsHandler.js";
import { sortingPostsHandler } from "./handlers/posts/sortingPostsHandler.js";

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
      logoutHandler();
      createProfilePostsHandler();
      addPostHandler();
      break;
    case "/feed/":
    case "/feed/index.html":
      handleScrollButton();
      logoutHandler();
      createPostsHandler();
      searchPostsHandler();
      sortingPostsHandler();
      break;
    case "/feed/post.html":
      createSinglePostHandler();
      break;
    default:
  }
}

route();
