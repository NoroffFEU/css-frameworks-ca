import * as postMethods from "../../posts/index.mjs";
import { renderPostTemplates } from "../../../templates/index.mjs";
import * as listeners from "../../../handlers/index.mjs";
import { isLoggedIn, getName } from "../../../helpers/storage.mjs";

export default function buildPosts(pathname) {
  const menuLi = document.querySelector("#forlogout");
  const btnLogout = document.createElement("button");
  if (isLoggedIn()) {
    const name = getName();

    btnLogout.classList.add("btn", "btn-secondary", "ms-2", "ms-0", "ms-md-3");
    btnLogout.id = "logout";
    btnLogout.innerText = `Log out ${name}`;
    menuLi.appendChild(btnLogout);

    listeners.setLogoutListener();

    async function postTemplates() {
      const posts = await postMethods.getPosts();
      const container = document.querySelector("#allPosts");
      renderPostTemplates(posts, container);
    }

    async function postTemplatesUser() {
      const posts = await postMethods.getPostsUser();
      const container = document.querySelector("#userPostCard");
      renderPostTemplates(posts, container);
    }

    if (
      window.location.pathname === "/posts/" ||
      window.location.pathname === "/posts/index.html"
    ) {
      postTemplates();
    }
    if (
      window.location.pathname === "/post/edit/" ||
      window.location.pathname === "/post/edit/index.html"
    ) {
      postTemplatesUser();
    }
  }
}
