import * as listeners from "./handlers/index.mjs";
import { postsTemplate } from "./templates/posts.mjs";
import { resultById } from "./templates/post.mjs";
import { postsFilter } from "./handlers/filterPosts.mjs";


const path = location.pathname;

if (path === '/profile/login/index.html') {
    listeners.setLoginFormListener();
  } else if (path === "/profile/register/index.html") {
    listeners.setRegisterFormListener();
  } else if (path === '/post/create') {
    listeners.setCreatePostFormListener();
  } else if (path === '/post/edit') {
    listeners.setUpdatePostFormListener();
  } else if (path === '/posts') {
    postsTemplate();
  } else if ( path === '/post') {
    resultById();
  } else if (path === '/posts') {
    postsFilter();
  }