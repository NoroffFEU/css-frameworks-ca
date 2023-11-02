import { formCheck } from "./components/formValidation.mjs";
import { characterCount } from "./components/formValidation.mjs";

const fieldset = document.querySelector(".add-post-fieldset");
const formInputs = fieldset.elements;
const btn = document.querySelector(".add-post-btn");

const textarea = document.querySelector("textarea");
const counter = document.querySelector(".counter");
const maxValText = document.querySelector(".max-val")

textarea.textContent = "";
characterCount("", counter, maxValText, 250)

for (let i = 0; i < formInputs.length; i++) {
    const input = formInputs[i];
    input.onkeyup = () => {
        formCheck(formInputs, btn);
        characterCount(textarea.value, counter, maxValText, 250, 15);
    }
}

import { getData } from "./components/getData.mjs";

const posts = [];
const token = localStorage.getItem("accessToken");
const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint;


endpoint = "/social/posts";
const fullURL = `${baseUrl}${endpoint}`;
getData(fullURL, token, posts);

console.log(posts);

for (let i = 0; i < posts.length; i++) {
    console.log("hello")
    // const post = posts[i];

    // console.log(post);
}