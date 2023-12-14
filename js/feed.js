import { API_BASE_URL, getPostsUrl, accessToken, createPostUrl, loader } from "./constants.js";
import { checkLogin, jwtDecoder, getPosts, createHTML, postsContainer } from "./module.mjs";

const container = document.getElementById("container");
const post = document.getElementById("post");

const forYou = document.querySelector("#forYou");
const following = document.querySelector("#following");
const followingUrl = `${API_BASE_URL}/posts/following`;

checkLogin(accessToken);

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

getPosts(getPostsUrl)
  .then((data) => data.json())
  .then((json) => {
    posts = json;
    loader.classList.add("d-none");
    postsContainer.innerHTML = "";
    createHTML(posts);
  });

forYou.addEventListener("click", (event) => {
  getPosts(getPostsUrl)
    .then((data) => data.json())
    .then((json) => {
      console.log(json);
      posts = json;
      loader.classList.add("d-none");
      postsContainer.innerHTML = "";
      createHTML(posts);
    });
});

following.addEventListener("click", (event) => {
  getPosts(followingUrl + "?_author=true&_comments=true&_reactions=true")
    .then((data) => data.json())
    .then((json) => {
      console.log(json);
      posts = json;
      loader.classList.add("d-none");
      postsContainer.innerHTML = "";
      createHTML(posts);
    });
});

const hiddenDiv = document.createElement("div");
hiddenDiv.classList.add("hiddendiv");
document.body.appendChild(hiddenDiv);
const textarea = document.querySelector("textarea");

textarea.addEventListener("input", function () {
  hiddenDiv.textContent = textarea.value + "\n";
  this.style.height = hiddenDiv.offsetHeight + "px";
});

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", (event) => {
  const query = searchInput.value.toLowerCase().trim();
  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().trim().includes(query);
  });
  postsContainer.innerHTML = "";
  createHTML(filteredPosts);
});
