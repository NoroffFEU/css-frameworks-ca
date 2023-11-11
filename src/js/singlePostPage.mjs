

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
const baseURL = "https://api.noroff.dev/api/v1";
const endpoint = `/social/posts/${id}`;
const completeUrl = `${baseURL}${endpoint}`;

const postDOM = document.querySelector(".single-post");