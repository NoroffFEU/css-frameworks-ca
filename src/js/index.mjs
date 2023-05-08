//Functions
import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";

import * as postMethods from "./api/posts/index.mjs";
import * as templates from "./templates/index.mjs";

const path = location.pathname;

if (path === "/profil/login/index.html") {
  setloginFormListener();
} else if (path === "/profil/register/index.html") {
  setRegisterFormListener();
}

async function testTemplate() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#post-container");
  templates.renderPostTemplates(posts, container);
}

testTemplate();
