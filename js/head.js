import { users } from "./users.js";

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

const nameContainer = document.getElementById("name-container");
if (window.innerWidth < 577) {
  nameContainer.classList.remove("mt-5");
} else {
  nameContainer.classList.add("mt-5");
}
