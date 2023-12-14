import * as listeners from "./handlers/index.mjs";
//import { postsTemplate } from "./templates/posts.mjs";
import { updatePost } from "./api/posts/update.mjs";
import * as postMethods from "./api/posts/index.mjs";
import { postsFilter } from "./handlers/filterPosts.mjs";
import { createPost } from "./api/posts/create.mjs";
import * as templates from "./templates/index.mjs";


const path = location.pathname;

if (path === "/profile/login/index.html") {
    listeners.setLoginFormListener();
  } else if (path === "/profile/register/index.html") {
    listeners.setRegisterFormListener();
  } else if (path === "/post/index.html") {
    listeners.setCreatePostFormListener();
  } else if (path === "/feed/index.html") {
    listeners.setUpdatePostFormListener();
} 
  
async function testTemplate() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#posts");
  templates.renderPostTemplates(posts, container);
}

testTemplate();