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

import { getData } from "./components/getData.mjs";

const allPostsDom = document.querySelector(".all-posts");
const token = localStorage.getItem("accessToken");
const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint;
let queries;


endpoint = "/social/posts/";
queries = "?_author=true&_comments=true&_reactions=true";
const feedUrl = `${baseUrl}${endpoint}${queries}`;
getData(feedUrl, token, allPostsDom, printFeed);

const sortByInp = document.querySelector("#sort-by");
const searchFrom = document.querySelector(".search-form");
const searcInp = document.querySelector("#search-input");

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

import { makePost } from "./components/postActions.mjs";
newPostForm.addEventListener("submit", (e) => {
    const divForError = document.querySelector(".div-for-error");
    e.preventDefault();
    const newPostURl = `${baseUrl}${endpoint}`;
    submitForm(newPostForm, newPostURl, makePost, divForError);
    getData(feedUrl, token, allPostsDom, printFeed);
});

import { deletePost } from "./components/deleteData.mjs";
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        const deleteBtns = document.querySelectorAll(".delete-post");
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.onclick = () => {
                const postToDelete = deleteBtn.id;
                const deleteURl = `${baseUrl}${endpoint}${postToDelete}`;
                deletePost(deleteURl);
                getData(feedUrl, token, allPostsDom, printFeed);
            };
        });

        const editBtns = document.querySelectorAll(".edit-post");
        editBtns.forEach((editBtn) => {
            editBtn.onclick = () => {
                const postToEdit = editBtn.id;
                const editUrl = `${baseUrl}${endpoint}${postToEdit}`;
                console.log(editUrl); // FIX THIS LATER 
                getData(feedUrl, token, allPostsDom, printFeed);
            };
        });
    })
});


const config = {attributes: true, childList: true, subtree: true};

observer.observe(allPostsDom, config);