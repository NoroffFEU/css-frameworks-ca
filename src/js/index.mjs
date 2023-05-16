//Functions
import * as listeners from "./handlers/index.mjs";
import * as postMethods from "./api/posts/index.mjs";
import * as templates from "./templates/index.mjs";
import * as storage from "./storage/index.mjs";

const path = location.pathname;

if (path === "/profil/login/index.html") {
  listeners.setloginFormListener();
} else if (path === "/profil/register/") {
  listeners.setRegisterFormListener();
} else if (path === "/post/create/") {
  listeners.setCreatePostFormListener();
} else if (path === "/post/edit/") {
  listeners.setUpdatePostFormListener();
} else if (path === "/profil/profile.html") {
  listeners.logoutListener();
}

// Trying to make it imposible to click the previous button in the browser
// to get back to the profile page when loged out

if (path !== "/profil/login/index.html" && !storage.load("token")) {
  document.body.innerHTML =
    "<p>You are not logged in. Please <a href='/profil/login/index.html'>log in here</a> to continue</p>";
}
/*async function testTemplate() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#post-container");
  templates.renderPostTemplates(posts, container);
}

testTemplate();*/
