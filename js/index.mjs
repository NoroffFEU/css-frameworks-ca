import * as templates from "./templates/index.mjs";
import * as postsMethods from "./api/posts/index.mjs";

import * as listeners from "./handlers/index.mjs";

const path = location.pathname;
console.log(path)

if (path === "/profile/login/index.html") {
  listeners.setLoginFormListener();
} else if (path === "/profile/register/") {
  listeners.setRegisterFormListener();
} else if (path === `/post/create/`) {
  listeners.setCreatePostListener();
} else if (path === `/post/edit/`) {
  listeners.setUpdatePostListener();
} else if (path === "/profile/edit/") {
  listeners.setUpdateProfileListener();
}




// async function testTemplate() {
//   const posts = await postsMethods.getPosts();
//   const container = document.querySelector("#posts");
//   templates.renderPostTemplates(posts, container);
// }
// testTemplate();

