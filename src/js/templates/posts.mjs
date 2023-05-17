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
  } else {
    cardImg.src = postData.media;
  }

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardContainer.appendChild(cardImg);
  cardContainer.appendChild(cardBody);
  return cardContainer;
}

export function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}
