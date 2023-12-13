/*
import * as listeners from "./handlers/index.mjs";
import { postsTemplate } from "./templates/posts.mjs";
import { resultById } from "./templates/post.mjs";
import { postsFilter } from "./handlers/filterPosts.mjs";
*/

import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener} from "./handlers/login.mjs";


const path = location.pathname;

if (path === "/profile/login/index.html" || path === "/post/login") {
    listeners.setLoginFormListener();
  } else if (
    path === "/profile/register/index.html" ||
    path === "/post/register"
  ) {
    listeners.setRegisterFormListener();
  } else if (path === "/post/create/index.html" || path === "/post/create") {
    listeners.setCreatePostFormListener();
  } else if (path === "/post/edit/index.html" || path === "/post/edit") {
    listeners.setUpdatePostFormListener();
  } else if (path === "/posts/index.html" || path === "/posts") {
    postsTemplate();
  } else if (path === "/post/index.html" || path === "/post") {
    resultById();
  } else if (path === "/posts/myPosts.html") {
    postsFilter();
  }