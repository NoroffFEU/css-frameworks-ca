// import { setRegisterFormListener } from "./handlers/register.mjs";
// import { setLoginFormListener } from "./handlers/login.mjs";

//import * as templates from "./templates/index.mjs";
import * as listeners from "./handlers/index.mjs";
import * as postMethods from "./api/posts/index.mjs";
//import { renderPostTemplate } from "./templates/index.mjs";
import { renderPostTemplates } from "./templates/index.mjs";

listeners.setRegisterFormListener();
listeners.setLoginFormListener();
listeners.setCreatePostListener();
listeners.setUpdatePostListener();
listeners.setUpdateProfileListener();


// const path = location.pathname;

// if (path === '/') {
//   listeners.setRegisterFormListener();
//   listeners.setLoginFormListener();
// } else if (path === '/post/edit/') {
//   listeners.setCreatePostListener();
//   listeners.setUpdatePostListener();
// } 

// async function testTemplate() {
//   const posts = await postMethods.getPosts();
//   const post = posts[76];
//   const container = document.querySelector("#post10");
//   renderPostTemplate(post, container);
// }

// testTemplate();

// async function testTemplates() {
//   const posts = await postMethods.getPosts();
//   const container = document.querySelector("#allPosts");
//   renderPostTemplates(posts, container);
// }

// testTemplates();
