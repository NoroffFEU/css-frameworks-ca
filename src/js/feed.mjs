import { formCheck } from "./components/formValidation.mjs";
import { characterCount } from "./components/formValidation.mjs";
import { submitForm } from "./components/submitForm.mjs";
import { makePost } from "./components/postActions.mjs";
import { printFeed } from "./components/getActions.mjs";
import { sortArray } from "./components/getActions.mjs";
import { searchArray } from "./components/getActions.mjs";
import { getData } from "./components/getData.mjs";
import { clearForm } from "./components/submitForm.mjs";

const linkToMyProfile = document.querySelector("#link-to-my-profile");
const myUserName = localStorage.getItem("userName");
const newPostForm = document.querySelector(".add-post-form");
const fieldset = document.querySelector(".add-post-fieldset");
const formInputs = fieldset.elements;
const btn = document.querySelector(".add-post-btn");

const textarea = document.querySelector("textarea");
const counter = document.querySelector(".counter");
const maxValText = document.querySelector(".max-val");

const sortByInp = document.querySelector("#sort-by");
const searchFrom = document.querySelector(".search-form");
const searcInp = document.querySelector("#search-input");

const allPostsDom = document.querySelector(".all-posts");
const token = localStorage.getItem("accessToken");
const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint;
let queries;

linkToMyProfile.href += `?name=${myUserName}`;

textarea.textContent = "";
characterCount("", counter, maxValText, 250)

for (let i = 0; i < formInputs.length; i++) {
    const input = formInputs[i];
    input.onkeyup = () => {
        formCheck(formInputs, btn);
        characterCount(textarea.value, counter, maxValText, 250, 15);
    }
}

endpoint = "/social/posts/";
queries = "?_author=true&_comments=true&_reactions=true";
const feedUrl = `${baseUrl}${endpoint}${queries}`;
getData(feedUrl, token, allPostsDom, printFeed);

;

searchFrom.onsubmit = (e) => {e.preventDefault()};

sortByInp.addEventListener("change", (e) => {
    allPostsDom.innerHTML = "";
    getData(feedUrl, token, allPostsDom, sortArray, sortByInp.value)
})

searcInp.onkeyup = () => {
    const willBeSearchParams = new FormData(searchFrom);
    const searchParams = {};
    willBeSearchParams.forEach((value, key) => (searchParams[key] = value));    
    getData(feedUrl, token, allPostsDom, searchArray, searchParams);
};

newPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const divForError = document.querySelector(".div-for-error");
    const newPostURl = `${baseUrl}${endpoint}`;
    submitForm(newPostForm, newPostURl, makePost, divForError);
    allPostsDom.innerHTML = "";
    clearForm(formInputs);
    setTimeout(() => {
        getData(feedUrl, token, allPostsDom, printFeed);
    }, 1000);
});

/**
 * Observes a DOM element for changes, in this case the allPostsDOM
 * If a user does not have a set avatar, this observer will replace the 
 * broken image icon with a placeholder icon
 */
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        const userAvatars = document.querySelectorAll(".profile-pic-tiny");
        userAvatars.forEach((userAvatar) => {
            if (userAvatar.outerHTML === `<img class="profile-pic-tiny" src="null" alt="User icon">` || userAvatar.outerHTML === `<img class="profile-pic-tiny" src="" alt="User icon">`) {
                userAvatar.outerHTML = `<img class="profile-pic-tiny" src="../images_and_icon/icons/user_icon.png" alt="User icon">`
            }
            })
        })
});


const config = {attributes: true, childList: true, subtree: true};

observer.observe(allPostsDom, config);