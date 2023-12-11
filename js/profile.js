import { API_BASE_URL, accessToken, loader } from "./constants.js";
import { checkLogin, getPosts, createHTML, getProfile, JWT } from "./module.mjs";

const countPosts = document.getElementById("countPosts");
const countFollowers = document.getElementById("countFollowers");
const countFollowing = document.getElementById("countFollowing");
const displayName = document.getElementById("displayName");
const noPostsMessage = document.getElementById("noPostsMessage");
const followButton = document.querySelector("#followButton");
const editProfile = document.querySelector("#editProfile");

checkLogin();
const profileName = window.location.search.replace("?", "");

getProfile(API_BASE_URL + "/profiles/", profileName)
  .then((data) => data.json())
  .then((user) => {
    console.log(user);
    countPosts.append(user._count.posts);
    countFollowers.append(user._count.followers);
    countFollowing.append(user._count.following);
    displayName.append(user.name);
    if (JWT.name === displayName.textContent) {
      followButton.classList.add("d-none");
      editProfile.classList.remove("d-none");
    }
  });

console.log(displayName.textContent);

let posts = [];

getPosts(`${API_BASE_URL}/profiles/${profileName}/posts?_author=true&_comments=true&_reactions=true`)
  .then((data) => data.json())
  .then((json) => {
    posts = json;
    loader.classList.add("d-none");
    if (posts.length === 0) {
      noPostsMessage.classList.remove("d-none");
    } else {
      createHTML(posts);
    }
  })
  .then(() => {
    if (JWT.name === displayName.textContent) {
      const gears = document.querySelectorAll(".fa-gear");
      console.log(gears);
      gears.forEach((gear) => {
        gear.classList.remove("d-none");
      });
    }
  });

document.addEventListener("click", function (event) {
  if (event.target.matches(".fa-gear")) {
    window.location.href = `./edit/post/?id=${event.target.dataset.id}`;
  }
});
