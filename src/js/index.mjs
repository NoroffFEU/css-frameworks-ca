//Functions
import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";
import * as post from "./api/posts/index.mjs";

const path = location.pathname;

if (path === "/profil/login/index.html") {
  setloginFormListener();
} else if (path === "/profil/register/index.html") {
  setRegisterFormListener();
}

//post.createPost();
//post.updatePost();
//post.reovePost();
//post.getPost();
post.getPosts().then(console.log);
