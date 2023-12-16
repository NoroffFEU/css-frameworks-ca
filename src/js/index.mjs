import * as listeners from "./handlers/index.mjs";
import { singlePost } from "./templates/post.mjs";
import { postsTemplate } from "./templates/posts.mjs";
import { searchTeams } from "./handlers/search.mjs";
import * as post from "./api/posts/index.mjs"

const path = location.pathname;

if (path === "/profile/login/index.html") {
  listeners.setLoginFormListener();
} else if (path === "/profile/register/index.html") {
  listeners.setRegisterFormListener();
} else if (path === "/post/index.html") {
  listeners.setCreatePostFormListener();
} else if (path === "/feed/index.html") {
  listeners.setUpdatePostFormListener();
} else if (path === "/posts/index.html") {
  postsTemplate();
} else if (path === "/post/index.html") {
  singlePost();
} else if (path === "/posts/index.html") {
  searchTeams();
}

post.removePost(9317);
