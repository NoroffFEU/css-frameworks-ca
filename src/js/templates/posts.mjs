import { setUpdatePostListener } from "../handlers/updatePost.mjs";
import { setDeletePostListener } from "../handlers/deletePost.mjs";

export function postTemplate(postData) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add(
    "card",
    "col-sm-4",
    "col-md-3",
    "col-xl-3",
    "shadow"
  );

  const cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top", "mt-2");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");

  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardTitle.innerText = postData.title;
  cardText.innerText = postData.body;

  if (!postData.media) {
    cardImg.src = "../../../img/no-image.jpg";
    cardImg.alt = `No image available`;
  } else {
    cardImg.src = postData.media;
    cardImg.alt = `Image from ${postData.title}`;
  }

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardContainer.appendChild(cardImg);
  cardContainer.appendChild(cardBody);

  if (
    window.location.pathname === "/post/edit/" ||
    window.location.pathname === "/post/edit/index.html"
  ) {
    const buttonEditPost = document.createElement("a");
    buttonEditPost.classList.add("btn", "btn-primary", "mb-3");
    buttonEditPost.innerText = "Edit post";
    buttonEditPost.href = `/post/edit/editpage.html?id=${postData.id}`;
    cardContainer.appendChild(buttonEditPost);
    buttonEditPost.addEventListener("click", setUpdatePostListener);

    const buttonDeletePost = document.createElement("a");
    buttonDeletePost.classList.add("btn", "btn-danger", "mb-3");
    buttonDeletePost.innerText = "Delete post";
    buttonDeletePost.dataset.id = postData.id;
    buttonDeletePost.dataset.delete = true;
    cardContainer.appendChild(buttonDeletePost);
    buttonDeletePost.addEventListener("click", setDeletePostListener);
  } else if (
    window.location.pathname === "/posts/" ||
    window.location.pathname === "/posts/index.html"
  ) {
    const buttonViewPost = document.createElement("a");
    buttonViewPost.classList.add("btn", "btn-primary", "mb-3");
    buttonViewPost.innerText = "View post";
    buttonViewPost.href = `/post/singlepost.html?id=${postData.id}`;
    cardContainer.appendChild(buttonViewPost);
  }

  return cardContainer;
}

export function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}
