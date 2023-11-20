import { getData } from "./components/getData.mjs";
import { singlePostContent } from "./components/getActions.mjs";
import { characterCount } from "./components/formValidation.mjs";
import { formCheck } from "./components/formValidation.mjs";
// import {  } from "module";

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
const baseURL = "https://api.noroff.dev/api/v1";
let endpoint = `/social/posts/${id}/?_reactions=true&_author=true&_comments=true`;
const completeUrl = `${baseURL}${endpoint}`;
const postDOM = document.querySelector(".single-post");
const token = localStorage.getItem("accessToken");

getData(completeUrl, token, postDOM, singlePostContent);


import { createReactions } from "./components/getActions.mjs";
import { createComments } from "./components/getActions.mjs";


const form = document.querySelector(".add-post-form");
const fieldset = document.querySelector(".add-post-fieldset");
const formInputs = fieldset.elements;
const btn = document.querySelector(".add-post-btn");
const textarea = document.querySelector("textarea");
const counter = document.querySelector(".counter");
const maxValText = document.querySelector(".max-val");
const reactionDiv = document.querySelector(".reactions");
const commentDiv = document.querySelector(".comments") 

getData(completeUrl, token, reactionDiv, createReactions);
getData(completeUrl, token, commentDiv, createComments);


for (let i = 0; i < formInputs.length; i++) {
    const input = formInputs[i];
    input.onkeyup = () => {
        formCheck(formInputs, btn);
        characterCount(textarea.value, counter, maxValText, 250, 15);
    }
}

import { postComment } from "./components/postActions.mjs";
import { submitForm } from "./components/submitForm.mjs";
const spanForError = document.querySelector(".error-msg")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    endpoint = `/social/posts/${id}/comment`;
    const postCommentUrl = `${baseURL}${endpoint}`;
    submitForm(form, postCommentUrl, postComment, spanForError);
    commentDiv.innerHTML += "";
    setTimeout(() => {
        getData(completeUrl, token, commentDiv, createComments);
    }, 1000);
});

/**
 * An observer to look out for changes to the DOM  elements, 
 * in order to add click functionallity to reactions. 
 */
const postObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        const deleteBtns = document.querySelectorAll(".delete");
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.onclick = () => {
                console.log("delete")
            }
        })

        const editBtns = document.querySelectorAll(".edit");
        editBtns.forEach((editBtn) => {
            editBtn.onclick = () => {
                console.log("edit");
            }
        })
    })
});

const reactionObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        const reactions = document.querySelectorAll(".reaction");
        reactions.forEach((react) => {
            react.onclick = () => {
                console.log("hello");
            }
        });

        const plusSymb = document.querySelector(".add-reaction");
        plusSymb.onclick = () => {
            console.log("goodbye");
        };
    })
});

const config = {attributes: true, childList: true, subtree: true};
postObserver.observe(postDOM, config);
reactionObserver.observe(reactionDiv, config);
postObserver.observe(commentDiv, config);

