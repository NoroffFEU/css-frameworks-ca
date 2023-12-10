import { API_BASE_URL, accessToken, loader } from "./constants.js";
import { checkLogin, getNameFromJwt, getPosts, deletePost, createHTML, getProfile } from "./module.mjs";

const countPosts = document.getElementById("countPosts");
const countFollowers = document.getElementById("countFollowers");
const countFollowing = document.getElementById("countFollowing");
const displayName = document.getElementById("displayName");
const noPostsMessage = document.getElementById("noPostsMessage");

checkLogin();
const user = getNameFromJwt(accessToken);
getProfile(API_BASE_URL + "/profiles/", user.name)
  .then((data) => data.json())
  .then((user) => {
    console.log(user);
    countPosts.append(user._count.posts);
    countFollowers.append(user._count.followers);
    countFollowing.append(user._count.following);
    displayName.append(user.name);
  });
console.log(user);

let posts = [];

getPosts(`${API_BASE_URL}/profiles/${user.name}/posts?_author=true&_comments=true&_reactions=true`)
  .then((data) => data.json())
  .then((json) => {
    posts = json;
    loader.classList.add("d-none");
    createHTML(posts);
  })
  .then(() => {
    const ellipsises = document.querySelectorAll(".fa-ellipsis");
    console.log(ellipsises);
    ellipsises.forEach((ellipsis) => {
      ellipsis.classList.remove("d-none");
    });
  });

document.addEventListener("click", function (event) {
  if (event.target.matches(".fa-ellipsis")) {
    window.location.href = `./edit/post/?id=${event.target.dataset.id}`;
  }
});
