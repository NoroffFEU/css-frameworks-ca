import { formCheck } from "./components/formValidation.mjs";
import { characterCount } from "./components/formValidation.mjs";
import { submitForm } from "./components/submitForm.mjs";

import { printFeed } from "./components/getActions.mjs";
import { sortArray } from "./components/getActions.mjs";
import { searchArray } from "./components/getActions.mjs";

const newPostForm = document.querySelector(".add-post-form");
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

newPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("HELLO");
    // const newPost = new FormData(newPostForm);
    // Not getting more work done for now, taking a break and goin to work
});

import { getData } from "./components/getData.mjs";

const allPostsDom = document.querySelector(".all-posts");
const token = localStorage.getItem("accessToken");
const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint;
let queries;


endpoint = "/social/posts";
queries = "?_author=true&_comments=true&_reactions=true";
const fullURL = `${baseUrl}${endpoint}${queries}`;
getData(fullURL, token, allPostsDom, printFeed);

const sortByInp = document.querySelector("#sort-by");
const searchFrom = document.querySelector(".search-form");
const searcInp = document.querySelector("#search-input");

searchFrom.onsubmit = (e) => {e.preventDefault()};

sortByInp.addEventListener("change", (e) => {
    allPostsDom.innerHTML = "";
    getData(fullURL, token, allPostsDom, sortArray, sortByInp.value)
})

searcInp.onkeyup = () => {
    const willBeSearchParams = new FormData(searchFrom);
    const searchParams = {};
    willBeSearchParams.forEach((value, key) => (searchParams[key] = value));    
    getData(fullURL, token, allPostsDom, searchArray, searchParams);
};

