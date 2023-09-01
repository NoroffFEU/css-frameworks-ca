import { users } from "./users.js";

//Followers
const followersContainer = document.getElementById("followers-container");
const followersCard = document.createElement("div");
followersCard.classList.add("card", "p-2", "dropshadow");
followersContainer.appendChild(followersCard);

const followersCardHeader = document.createElement("div");
followersCardHeader.classList.add("container", "w-100");
followersCard.appendChild(followersCardHeader);

const followersCardHeaderText = document.createElement("h6");
followersCardHeaderText.classList.add("nametag", "mb-3", "pt-3");
followersCardHeaderText.innerText = "I'm following";
const followersCount = document.createElement("b");
followersCount.innerText = " 40";
followersCardHeaderText.appendChild(followersCount);
followersCardHeader.appendChild(followersCardHeaderText);

const followesIconContainer = document.createElement("div");
followesIconContainer.classList.add("container", "row", "w-100");
followersCard.appendChild(followesIconContainer);

users.forEach((person) => {
  const followersIcon = document.createElement("img");
  followersIcon.classList.add(
    "rounded-circle",
    "col-1",
    "p-0",
    "border",
    "m-1"
  );
  followersIcon.style.width = "50px";
  followersIcon.style.height = "50px";
  followersIcon.style.objectFit = "cover";
  followersIcon.src = person.profilePicture;
  followesIconContainer.appendChild(followersIcon);
});

//Following
const followingContainer = document.getElementById("following-container");
const followingCard = document.createElement("div");
followingCard.classList.add("card", "p-2", "dropshadow");
followingContainer.appendChild(followingCard);

const followingCardHeader = document.createElement("div");
followingCardHeader.classList.add("container", "w-100");
followingCard.appendChild(followingCardHeader);

const followingCardHeaderText = document.createElement("h6");
followingCardHeaderText.classList.add("nametag", "mb-3", "pt-3");
followingCardHeaderText.innerText = "Following me";
const followingCount = document.createElement("b");
followingCount.innerText = " 35";
followingCardHeaderText.appendChild(followingCount);
followingCardHeader.appendChild(followingCardHeaderText);

const followingIconContainer = document.createElement("div");
followingIconContainer.classList.add("container", "row", "w-100");
followingCard.appendChild(followingIconContainer);

users.forEach((person) => {
  const followingIcon = document.createElement("img");
  followingIcon.classList.add(
    "rounded-circle",
    "col-sm-1",
    "p-0",
    "border",
    "m-1"
  );
  followingIcon.style.width = "50px";
  followingIcon.style.height = "50px";
  followingIcon.style.objectFit = "cover";
  followingIcon.src = person.profilePicture;
  followingIconContainer.appendChild(followingIcon);
});

if (window.innerWidth < 768) {
  followersCard.classList.style.display = "none";
  followingCard.classList.style.display = "none";
} else {
  followersCard.classList.style.display = "block";
  followingCard.classList.style.display = "block";
}
