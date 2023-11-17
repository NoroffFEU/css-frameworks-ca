import { getData } from "./components/getData.mjs";
import { singlePostContent } from "./components/getActions.mjs";
import { characterCount } from "./components/formValidation.mjs";
import { formCheck } from "./components/formValidation.mjs";
// import {  } from "module";

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
const baseURL = "https://api.noroff.dev/api/v1";
const endpoint = `/social/posts/${id}/?_reactions=true&_author=true&_comments=true`;
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

form.addEventListener("submit", (e) => {
    e.preventDefault();

});

/**
 * An observer to look out for changes to the DOM  elements, 
 * in order to add click functionallity to reactions. 
 */
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        const reactions = document.querySelectorAll(".reaction");
        reactions.forEach((react) => {
            react.onclick = () => {
                console.log("hello")
            }
        });

        const plusSymb = document.querySelector(".add-reaction");
        plusSymb.onclick = () => {
            console.log("goodbye")
        };

        const deleteCommentBtn = document.querySelector(".delete-comment");
        if (deleteCommentBtn) {
            deleteCommentBtn.onclick = () => {
                console.log("DELETE MEEEE");
            };
        }

        const editCommentBtn = document.querySelector(".edit-comment");
        if (editCommentBtn) {
            editCommentBtn.onclick = () => {
                console.log("Edit me por favor");
            };
        }
    })
});


const config = {attributes: true, childList: true, subtree: true};

observer.observe(reactionDiv, config);

observer.observe(commentDiv, config)