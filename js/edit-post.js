import { comments, reactions } from "./constants.js";
import { getPosts } from "./module.mjs";

const parameterString = window.location.search;
const params = new URLSearchParams(parameterString);
const id = params.get("id");
const singlePostUrl = `https://api.noroff.dev/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`;

const editTitle = document.querySelector("#editTitle");
const editBody = document.querySelector("#editBody");
const postAuthorName = document.querySelector("#postAuthorName");
const editForm = document.querySelector("#editForm");

getPosts(singlePostUrl)
  .then((data) => data.json())
  .then((post) => {
    console.log(post);
    editTitle.value = post.title;
    editBody.value = post.body;
    postAuthorName.append(post.author.name);
    comments.append(post._count.comments);
    reactions.append(post._count.reactions);
  });

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("submit");
});
