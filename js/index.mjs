import * as templates from "./templates/index.mjs";
import * as postsMethods from "./api/posts/index.mjs";
import * as listeners from "./handlers/index.mjs";

const path = location.pathname;

if (path === "/profile/login/index.html") {
  listeners.setLoginFormListener();
} else if (path === "/profile/register/") {
  listeners.setRegisterFormListener();
} else if (path === `/post/create/`) {
  listeners.setCreatePostListener();
} else if (path === `/post/edit/`) {
  listeners.setUpdatePostListener();
}

async function testTemplate() {
  const posts = await postsMethods.getPosts();
  const container = document.querySelector("#posts");
  templates.renderPostTemplates(posts, container);
}
testTemplate();
// posts.createPost();
// posts.updatePost();
// posts.removePost();
// posts.getPost();
// posts.getPosts().then(console.log);
// posts.removePost(10470)
