import { createElement } from "./createHtmlFunction.js";
import { parseDate } from "../../parse/parse.js";
import { createCommentsContainer } from "./createComments.js";
import { checkEditPost, deletePost, editPost } from "../../posts/editPosts.js";
import { viewPost } from "../../posts/viewSpecificPost.js";

const postContainer = document.getElementById("posts-container");
console.log(postContainer);

export const createPosts = ({ author, title, body, media, created, id, comments }) => {
  const post = createElement("div", ["post", "p-3", "mb-3", "bg-white"]);
  post.id = id;

  const postAuthor = createPostAuthor(author, id, title, body, media);
  const postContent = createPostContent(title, body, media, created);

  postContent.style.cursor = "pointer";
  postContent.addEventListener("click", (e) => viewPost(id));

  const commentsContainer = createCommentsContainer(id, comments);

  post.append(postAuthor, postContent, commentsContainer);

  postContainer.append(post);
};

const createPostAuthor = ({ name, avatar }, id, title, body, media) => {
  const element = createElement("div", ["d-flex", "align-items-center", "justify-content-between", "pb-2", "border-bottom", "border-primary"]);
  const img = createElement("img", ["author-img"], undefined, undefined, undefined, undefined, name);

  if (avatar) {
    img.src = avatar;
  } else {
    img.src = "../images/profile.jpg";
  }
  const h2 = createElement("h2", ["text-primary", "fs-6", "fw-bold", "ps-2", "pt-2"], undefined, name);

  const anchorContainer = createElement("a", ["d-flex", "align-items-center"], [img, h2], undefined, `../../profile/index.html?id=${name}`);

  element.append(anchorContainer);

  if (checkEditPost(name)) {
    const editBtn = createEditBtn(id, title, body, media);
    element.append(editBtn);
  }
  return element;
};

const createPostContent = (title, body, media, created) => {
  const element = createElement("div", ["post-content"]);
  if (media) {
    const img = createElement("img", ["py-2", "post-img"], undefined, undefined, undefined, media);
    element.append(img);
  }

  const headingContainer = createHeadingContainer(title, created);
  const p = createElement("p", ["text-muted"], undefined, body);

  element.append(headingContainer, p);
  return element;
};

const createHeadingContainer = (title, created) => {
  const element = createElement("div", ["pt-2"]);

  const h2 = createElement("h3", ["fs-6", "fw-bold", "m-0"], undefined, title);
  const date = parseDate(created);
  const createdDate = createElement("p", undefined, undefined, date);

  element.append(h2, createdDate);
  return element;
};

const createEditBtn = (id, title, body, media) => {
  const element = createElement("div", ["dropdown"]);
  const btn = createElement("button", ["btn", "text-primary", "bg-white", "border", "border-primary", "dropdown-toggle"], undefined, "Edit");
  btn.setAttribute("data-bs-toggle", "dropdown");

  const firstLi = createElement("li", ["dropdown-item", "text-primary"], undefined, "Delete");
  firstLi.addEventListener("click", (e) => deletePost(id));

  const secondLi = createElement("li", ["dropdown-item", "text-primary"], undefined, "Edit");
  secondLi.addEventListener("click", (e) => editPost(id, title, body, media));

  const ul = createElement("ul", ["dropdown-menu", "edit-dropdown"], [firstLi, secondLi]);

  element.append(btn, ul);

  return element;
};
