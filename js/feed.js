import { API_BASE_URL, getPostsUrl, accessToken, createPostUrl, loader } from "./constants.js";
import { checkLogin, jwtDecoder, getPosts, createHTML } from "./module.mjs";

const container = document.getElementById("container");
const post = document.getElementById("post");

checkLogin();
jwtDecoder(accessToken);

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
  fetch(createPostUrl, methodOptions)
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

const hiddenDiv = document.createElement("div");
hiddenDiv.classList.add("hiddendiv");
document.body.appendChild(hiddenDiv);
const textarea = document.querySelector("textarea");

textarea.addEventListener("input", function () {
  hiddenDiv.textContent = textarea.value + "\n";
  this.style.height = hiddenDiv.offsetHeight + "px";
});
