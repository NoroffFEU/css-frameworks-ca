import * as postMethods from "../../posts/index.mjs";
import { renderPostTemplates } from "../../../templates/index.mjs";
import * as listeners from "../../../handlers/index.mjs";
import { isLoggedIn, getName } from "../../../helpers/storage.mjs";
import { load } from "../../../storage/index.mjs";

/**
  *Builds the posts section based on the current page pathname.
  *@param {string} pathname - The current page pathname.
  *Renders post templates on the posts page.
  *Renders post templates for the user's posts on the user's profile page.
  *Renders the template for a single post on the post detail page.
 */
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
      const profile = await load("profile");

      const aboutUserContainer = document.querySelector("#aboutUser");
      const userImgContainer = document.createElement("div");
      userImgContainer.classList.add("col-md-5");
      const userImg = document.createElement("img");
      userImg.classList.add("img-fluid", "rounded-3", "justify-content-start");

      if (!profile.avatar) {
        userImg.src = "../../../../../img/no-image.jpg";
        userImg.alt = `No image available`;
      } else {
        userImg.src = profile.avatar;
        userImg.alt = "Your profile image";
      }

      const userInfoContainer = document.createElement("div");
      userInfoContainer.classList.add(
        "col-md-4",
        "text-center",
        "text-md-start"
      );
      const userUsername = document.createElement("h1");
      userUsername.classList.add("text-dark");
      userUsername.innerText = profile.name;
      const userEmail = document.createElement("h2");
      userEmail.classList.add("text-muted", "mb-4");
      userEmail.innerText = profile.email;
      const editProfileBtn = document.createElement("a");
      editProfileBtn.classList.add(
        "btn",
        "btn-primary",
        "text-white",
        "fw-bold",
        "text-uppercase",
        "w-75",
        "mb-2"
      );
      editProfileBtn.href = "../../profile/edit/index.html";
      editProfileBtn.innerText = "Edit account";

      userImgContainer.appendChild(userImg);
      userInfoContainer.appendChild(userUsername);
      userInfoContainer.appendChild(userEmail);
      userInfoContainer.appendChild(editProfileBtn);
      aboutUserContainer.appendChild(userImgContainer);
      aboutUserContainer.appendChild(userInfoContainer);

      const posts = await postMethods.getPostsUser();
      const container = document.querySelector("#userPostCard");
      renderPostTemplates(posts, container);
    }

    async function postTemplatesOne() {
      const url = new URL(location.href);
      const id = url.searchParams.get("id");
      const post = await postMethods.getPost(id);
      
      const onePostContainer = document.querySelector("#onePost");
      
      const imgMedia = document.createElement("img");
      imgMedia.classList.add("img-fluid", "col-4"); 
      
      const singlePostTitle = document.createElement("h2");
      singlePostTitle.innerText = post.title;
      singlePostTitle.classList.add("text-center", "text-muted");

      const singlePostText = document.createElement("p");
      singlePostText.innerText = post.body;
      singlePostText.classList.add("col-8");

      if (!post.media) {
        imgMedia.src = "../../../../../img/no-image.jpg";
      } else {
        imgMedia.src = post.media;
      }

      onePostContainer.appendChild(imgMedia);
      onePostContainer.appendChild(singlePostTitle);
      onePostContainer.appendChild(singlePostText);
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

    if (window.location.pathname === "/post/singlepost.html") {
      postTemplatesOne();
    }
  }
}
