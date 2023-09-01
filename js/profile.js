import { users } from "./users.js";

const profileContainer = document.getElementById("profile-container");
const profileHead = document.createElement("div");
profileHead.classList.add("container", "row", "w-100", "mt-2");
profileContainer.appendChild(profileHead);

const profileTitle = document.createElement("h6");
profileTitle.classList.add("nametag", "p-3");
profileTitle.innerText = "Latest posts";
profileHead.appendChild(profileTitle);

const profileImgContainer = document.createElement("div");
profileImgContainer.classList.add("container", "row", "p-3", "m-0");
profileContainer.appendChild(profileImgContainer);

users.forEach((person) => {
  const profileImg = document.createElement("img");
  profileImg.classList.add("img-profile", "p-0", "dropshadow", "col-sm", "m-2");
  profileImg.style.objectFit = "cover";
  profileImg.src = person.pictureUpload;
  profileImgContainer.appendChild(profileImg);
});
