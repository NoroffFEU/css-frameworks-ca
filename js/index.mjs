import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import { removePost } from "./api/posts/delete.mjs";;
import { updatePost } from "./api/posts/update.mjs";

import * as posts from "./api/posts/index.mjs";

const path = location.pathname;

if (path === "/profile/login/index.html") {
  setLoginFormListener();
} else if (path === "/profile/register/") {
  setRegisterFormListener();
}



// posts.createPost();
// posts.updatePost();
// posts.removePost();
// posts.getPost();
// posts.getPosts().then(console.log);
// posts.removePost(10470)


