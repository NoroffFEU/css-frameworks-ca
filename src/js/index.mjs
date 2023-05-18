//Functions
import * as listeners from "./handlers/index.mjs";
import * as domContent from "./templates/index.mjs";
import * as storage from "./storage/index.mjs";

const path = location.pathname;

if (path === "/profil/login/index.html") {
  listeners.setloginFormListener();
} else if (path === "/profil/register/") {
  listeners.setRegisterFormListener();
} else if (path === "/post/create/index.html") {
  listeners.setCreatePostFormListener();
} else if (path === "/post/edit/") {
  listeners.setUpdatePostFormListener();
} else if (path === "/profil/profile.html") {
  listeners.logoutListener();
} else if (path === "/posts/index.html") {
  domContent.showContentOnPage();
} else if (path === "/posts/userPosts/posts.html") {
  domContent.showCurrentUserPosts();
}

// Trying to make it imposible to click the previous button in the browser
// to get back to the profile page when loged out

if (path !== "/profil/login/index.html" && !storage.load("token")) {
  document.body.innerHTML =
    "<p>You are not logged in. Please <a href='/profil/login/index.html'>log in here</a> to continue</p>";
}
