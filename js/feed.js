import { API_BASE_URL, getPostsUrl, accessToken, postUrl, loader, profile } from "./constants.js";
import { checkLogin, getNameFromJwt, getPosts, createHTML } from "./module.mjs";

const container = document.getElementById("container");
const post = document.getElementById("post");

checkLogin();
getNameFromJwt(accessToken);

post.addEventListener("submit", function (event) {
  event.preventDefault();
  const postTitle = document.getElementById("title").value;
  const postText = document.getElementById("postText").value;
  const methodOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: postTitle,
      body: postText,
    }),
  };
  fetch(postUrl, methodOptions)
    .then((data) => data.json())
    .then((json) => {
      console.log(json);
      window.location.reload();
    });
});

let posts = [];

getPosts(`${getPostsUrl}?_author=true&_comments=true&_reactions=true`)
  .then((data) => data.json())
  .then((json) => {
    posts = json;
    loader.classList.add("d-none");
    createHTML(posts);
    console.log(posts);
  });
