import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";

//import * as templates from "./templates/index.mjs";
import * as postMethods from "./api/posts/index.mjs";
//import { renderPostTemplate } from "./templates/index.mjs";
import { renderPostTemplates } from "./templates/index.mjs";

setRegisterFormListener();
setLoginFormListener();

// async function testTemplate() {
//   const posts = await postMethods.getPosts();
//   const post = posts[76];
//   const container = document.querySelector("#post10");
//   renderPostTemplate(post, container);
// }

// testTemplate();

async function testTemplates() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#allPosts");
  renderPostTemplates(posts, container);
}

testTemplates();
