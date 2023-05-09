//Functions

import * as postMethods from "./api/posts/index.mjs";
import * as templates from "./templates/index.mjs";
import * as listeners from "./handlers/index.mjs";

const path = location.pathname;

if (path === "/profil/login/index.html") {
  listeners.setloginFormListener();
} else if (path === "/profil/register/index.html") {
  listeners.setRegisterFormListener();
} else if (path === "/post/create/index.html") {
  listeners.setCreatePostFormListener();
} else if (path === "/post/edit/index.html") {
  listeners.setUpdatePostFormListener();
}

/*async function testTemplate() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#post-container");
  templates.renderPostTemplates(posts, container);
}

testTemplate();*/
