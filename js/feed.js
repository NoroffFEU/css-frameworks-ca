import { users } from "./users.js";

//Containers
const feedContainer = document.getElementById("feed-container");
const headerContainer = document.getElementById("header-container");

//Header
const profilePicHeader = document.getElementById("profile-pic-header");
profilePicHeader.src = users[0].profilePicture;

//Heading and profile
const profilePic = document.getElementById("profile-pic");
profilePic.src = users[0].profilePicture;

const profileName = document.getElementById("full-name");
profileName.innerText = users[0].name;

const profileUsername = document.getElementById("username");
profileUsername.innerText = users[0].username;

//Upload
const uploadContainer = document.createElement("div");
uploadContainer.classList.add("card", "mb-4");
feedContainer.appendChild(uploadContainer);

const uploadHead = document.createElement("div");
uploadHead.classList.add("card-body", "d-flex", "align-content-center");
uploadContainer.appendChild(uploadHead);

const uploadProfilepic = document.createElement("img");
uploadProfilepic.classList.add("rounded-circle", "me-4", "border");
uploadProfilepic.src = users[0].profilePicture;
uploadProfilepic.style.width = "50px";
uploadProfilepic.style.height = "50px";
uploadProfilepic.style.objectFit = "cover";
uploadHead.appendChild(uploadProfilepic);

const uploadHeadText = document.createElement("p");
uploadHeadText.classList.add("text-muted", "pt-3");
uploadHeadText.innerText = "What's on your mind?";
uploadHead.appendChild(uploadHeadText);

const uploadBody = document.createElement("div");
uploadBody.classList.add("card-header", "dropshadow");
uploadContainer.appendChild(uploadBody);

const uploadIconImage = document.createElement("img");
uploadIconImage.src = "/img/uploadimage.png";
uploadIconImage.classList.add("me-2");

const uploadIconVideo = document.createElement("img");
uploadIconVideo.src = "/img/uploadvideo.png";
uploadIconVideo.classList.add("me-2");

const uploadIconAttatchment = document.createElement("img");
uploadIconAttatchment.src = "/img/uploadattatchment.png";

uploadBody.appendChild(uploadIconImage);
uploadBody.appendChild(uploadIconVideo);
uploadBody.appendChild(uploadIconAttatchment);

//Sort
const sortContainer = document.createElement("div");
sortContainer.classList.add("container", "p-0");
feedContainer.appendChild(sortContainer);

const sortRow = document.createElement("div");
sortRow.classList.add("row", "w-100", "mb-4", "mt-4", "p-0", "m-0");
sortContainer.appendChild(sortRow);

const sortBtnNewest = document.createElement("button");
sortBtnNewest.classList.add(
  "btn",
  "btn-light",
  "dropshadow",
  "rounded-pill",
  "px-3",
  "col",
  "mb-2"
);
sortBtnNewest.innerText = "Sort by newest";

if (window.innerWidth < 350) {
  sortBtnNewest.classList.remove("me-4");
} else {
  sortBtnNewest.classList.add("me-4");
}

sortRow.appendChild(sortBtnNewest);

const sortBtnOldest = document.createElement("button");
sortBtnOldest.classList.add(
  "btn",
  "btn-light",
  "dropshadow",
  "rounded-pill",
  "px-3",
  "col",
  "mb-2"
);
sortBtnOldest.innerText = "Sort by oldest";
sortRow.appendChild(sortBtnOldest);

//Feed
users.forEach((user) => {
  const feedCard = document.createElement("div");
  feedCard.classList.add("card", "w-100", "mb-4");
  feedContainer.appendChild(feedCard);

  const cardTextTop = document.createElement("div");
  cardTextTop.classList.add("card-text", "row", "p-4");
  feedCard.appendChild(cardTextTop);

  const cardProfilePic = document.createElement("img");
  cardProfilePic.classList.add(
    "rounded-circle",
    "col",
    "p-0",
    "card-profile",
    "border"
  );
  cardProfilePic.src = user.profilePicture;
  cardTextTop.appendChild(cardProfilePic);

  const cardProfileInfo = document.createElement("div");
  cardProfileInfo.classList.add("col-9");
  cardTextTop.appendChild(cardProfileInfo);

  const cardProfileName = document.createElement("h5");
  cardProfileName.classList.add("mb-0");
  cardProfileName.innerText = user.name;
  cardProfileInfo.appendChild(cardProfileName);

  const cardProfileUsername = document.createElement("p");
  cardProfileUsername.classList.add("nametag");
  cardProfileUsername.innerText = user.username;
  cardProfileInfo.appendChild(cardProfileUsername);

  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top", "feed-image", "dropshadow");
  cardImage.src = user.pictureUpload;
  cardImage.alt = "Feed image";
  feedCard.appendChild(cardImage);

  const cardTextBottom = document.createElement("div");
  cardTextBottom.classList.add("card-body", "mt-4");
  feedCard.appendChild(cardTextBottom);

  const cardTextBottomContent = document.createElement("p");
  cardTextBottomContent.classList.add("card-text");
  cardTextBottomContent.innerText = user.description;
  cardTextBottom.appendChild(cardTextBottomContent);

  const cardTextBottomIcons = document.createElement("div");
  cardTextBottomIcons.classList.add("mt-4", "mb-2");
  cardTextBottom.appendChild(cardTextBottomIcons);

  const likebutton = document.createElement("img");
  likebutton.src = "/img/likebutton.png";
  likebutton.classList.add("me-3");
  likebutton.style.cursor = "pointer";
  likebutton.addEventListener("click", () => {
    if (likebutton.src.includes("likebutton.png")) {
      likebutton.src = "/img/likebuttonfull.png";
    } else {
      likebutton.src = "/img/likebutton.png";
    }
  });

  const commentbutton = document.createElement("img");
  commentbutton.src = "/img/commentbutton.png";
  commentbutton.classList.add("me-3");

  const sharebutton = document.createElement("img");
  sharebutton.src = "/img/sharebutton.png";

  cardTextBottomIcons.appendChild(likebutton);
  cardTextBottomIcons.appendChild(commentbutton);
  cardTextBottomIcons.appendChild(sharebutton);
});
