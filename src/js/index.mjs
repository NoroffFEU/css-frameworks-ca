import * as listeners from "./handlers/index.mjs";
import * as templates from "./templates/index.mjs";
import * as postMethods from "./api/posts/index.mjs";

import { API_SOCIAL_URL } from "./api/constants.mjs";
import { renderPosts } from "./ui/renderPosts.mjs";
import { searchPosts } from "./ui/searchPosts.mjs";

const path = location.pathname;

console.log(path);

const action = "/posts";

const baseUrl = API_SOCIAL_URL + action;

if (path === "/profile/login/") {
  listeners.setLoginFormListener();
} else if (path === "/profile/register/") {
  listeners.setRegisterFormListener();
} else if (path === "/post/create/") {
  listeners.setCreatePostFormListener();
} else if (path === "/post/edit/") {
  listeners.setUpdatePostListener();
} else if (path === "/profile/edit/") {
  listeners.setUpdateProfileListener();
}

async function createPostTemplate() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#posts");
  templates.renderPostTemplates(posts, container);
}

createPostTemplate();

async function getNewPosts() {
  try {
    const response = await fetch(baseUrl);
    const postsSearch = await response.json();
    console.log(postsSearch);

    renderPosts(postsSearch);
    searchPosts(postsSearch);
  } catch (error) {
    console.log(error);
  }
}

getNewPosts();
