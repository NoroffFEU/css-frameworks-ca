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

const allPostsDom = document.querySelector(".all-posts");
const token = localStorage.getItem("accessToken");
const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint;
let queries;


endpoint = "/social/posts";
queries = "?_author=true&_comments=true&_reactions=true";
const fullURL = `${baseUrl}${endpoint}${queries}`;
getData(fullURL, token, allPostsDom, "print");

const sortByInp = document.querySelector("#sort-by");
const searchFrom = document.querySelector(".search-form");
const searcInp = document.querySelector("#search-input");

sortByInp.addEventListener("change", (e) => {
    allPostsDom.innerHTML = "";
    getData(fullURL, token, allPostsDom, "sort", sortByInp.value)
})

searcInp.onkeyup = () => {
    const willBeSearchParams = new FormData(searchFrom);
    const searchParams = {};
    willBeSearchParams.forEach((value, key) => (searchParams[key] = value));    
    getData(fullURL, token, allPostsDom, "search", searchParams)
};