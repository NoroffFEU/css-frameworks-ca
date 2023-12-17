import * as listeners from "./handlers/index.mjs";
import { singlePost } from "./templates/post.mjs";
import { postsTemplate } from "./templates/posts.mjs";
import { searchTeams } from "./handlers/search.mjs";


const path = location.pathname;

if (path === "/profile/login/index.html") {
  listeners.setLoginFormListener();
} else if (path === "/profile/register/index.html") {
  listeners.setRegisterFormListener();
} else if (path === "/post/create/index.html") {
  listeners.setCreatePostListener();
} else if (path === "/post/edit/index.html") {
  listeners.setUpdatePostListener();
} else if (path === "/posts/index.html") {
  postsTemplate();
} else if (path === "/post/index.html") {
  singlePost();
} else if (path === "/posts/index.html") {
  searchTeams();
}


