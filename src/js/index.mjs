//Functions
import * as listeners from "./handlers/index.mjs";
import * as postMethods from "./api/posts/index.mjs";
import * as templates from "./templates/index.mjs";

const path = location.pathname;

if (path === "/profil/login/") {
  listeners.setloginFormListener();
} else if (path === "/profil/register/") {
  listeners.setRegisterFormListener();
} else if (path === "/post/create/") {
  listeners.setCreatePostFormListener();
} else if (path === "/post/edit/") {
  listeners.setUpdatePostFormListener();
}

/*async function testTemplate() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#post-container");
  templates.renderPostTemplates(posts, container);
}

testTemplate();*/
