import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import * as templates from "./templates/index.mjs";
import * as postsMethods from "./api/posts/index.mjs";

const path = location.pathname;

if (path === "/profile/login/index.html") {
  setLoginFormListener();
} else if (path === "/profile/register/") {
  setRegisterFormListener();
}

async function testTemplate() {
  const posts = await postsMethods.getPosts();
  const container = document.querySelector("#post");
  templates.renderPostTemplates(posts, container);
}
testTemplate();
// posts.createPost();
// posts.updatePost();
// posts.removePost();
// posts.getPost();
// posts.getPosts().then(console.log);
// posts.removePost(10470)
