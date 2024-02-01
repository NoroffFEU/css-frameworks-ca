import { registerFormListener } from "./handler/register/index.mjs";
import { loginFormListener } from "./handler/login/index.mjs";

import * as templates from "./templates/index.mjs";
import * as postMethod from "./posts/index.mjs";
import { renderPostTemplate } from "./templates/index.mjs"; 


const path = location.pathname;

switch (path) {
  case '/index.html':
  case '/':
    loginFormListener();
    break;
  case '/create-account/index.html':
    registerFormListener();
    break;
  default:
}


async function testTemplate() {
  const posts = await postMethod.getPosts();
  const post = posts[1];
  const container = document.querySelector('#post');
  renderPostTemplate(post, container);
}

testTemplate();