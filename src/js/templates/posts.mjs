import { setUpdatePostListener } from "../handlers/updatePost.mjs";
import { redirectToEditPage } from "../handlers/redirect.mjs";

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
    window.location.pathname === "/post/edit/index.html") {
    const buttonEditPost = document.createElement("a");
    buttonEditPost.classList.add("btn", "btn-primary", "mb-3");
    buttonEditPost.innerText = "Edit post";
    cardContainer.appendChild(buttonEditPost);
    buttonEditPost.addEventListener("click", redirectToEditPage);
  }

  return cardContainer;
}

export function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}
