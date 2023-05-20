import * as postMethods from "../../posts/index.mjs";
import { renderPostTemplates } from "../../../templates/index.mjs";
import * as listeners from "../../../handlers/index.mjs";
import { isLoggedIn, getName } from "../../../helpers/storage.mjs";

export default function buildPosts(pathname) {
  const menuLi = document.querySelector("#forlogout");
  const btnLogout = document.createElement("button");
  if (isLoggedIn()) {
    const name = getName();

    btnLogout.classList.add("btn", "btn-secondary", "me-2");
    btnLogout.id = "logout";
    btnLogout.innerText = `Log out ${name}`;
    menuLi.appendChild(btnLogout);

    listeners.setLogoutListener();

    async function postTemplates() {
      const posts = await postMethods.getPosts();
      const container = document.querySelector("#allPosts");
      renderPostTemplates(posts, container);
    }

    postTemplates();
  } else {
    // menuLi.removeChild(btnLogout);
  }
}
