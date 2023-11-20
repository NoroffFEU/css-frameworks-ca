import { getData } from "./components/getData.mjs";
import { singlePostContent } from "./components/getActions.mjs";
import { characterCount } from "./components/formValidation.mjs";
import { formCheck } from "./components/formValidation.mjs";

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
import { putData } from "./components/putData.mjs";
const spanForError = document.querySelector(".error-msg")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    endpoint = `/social/posts/${id}/comment`;
    const postCommentUrl = `${baseURL}${endpoint}`;
    submitForm(form, postCommentUrl, postComment, spanForError);
    textarea.value = "";
    commentDiv.innerHTML = "";
    setTimeout(() => {
        getData(completeUrl, token, commentDiv, createComments);
    }, 1000);
});

import { deletePost } from "./components/deleteData.mjs";

/**
 * An observer to look out for changes to the DOM  elements, 
 * in order to add click functionallity to reactions. 
 */
const postObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        endpoint = `/social/posts/${id}`;
        const postCommentUrl = `${baseURL}${endpoint}`;
        const deleteBtns = document.querySelectorAll(".delete");
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.onclick = () => {
                deletePost(postCommentUrl)
                postDOM.innerHTML = `
                <div>
                    <p>Post deleted</p>
                </div>
                `;
            }
        })

        const editBtns = document.querySelectorAll(".edit");
        editBtns.forEach((editBtn) => {
            editBtn.onclick = () => {
                console.log("edit");
                // postDOM.innerHTML = `
                // <form class="edit-post d-flex flex-column align-items-center" action="submit">
                //     <label for="title">Post Title</label>
                //     <input type="text" name="title" id="title">
                //     <label for="body">Body text</label>
                //     <textarea name="body" id="body" cols="30" rows="10"></textarea>
                //     <label for="media">Media</label>
                //     <input type="text" name="media" id="media">
                //     <button>Save changes</button>
                // </form>
                // `;
                
                //Working on a way to edit comments, but I'm not sure about this solution. 
                // Gonna take a break an think on it 
            }
        })
    })
});

const reactionObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        const reactions = document.querySelectorAll(".reaction");
        reactions.forEach((react) => {
            react.onclick = () => {
                let reactText = react.textContent;
                let symbol = reactText.slice(0, reactText.length -1);
                endpoint = `/social/posts/${id}/react/${symbol}`;
                const reactUrl = `${baseURL}${endpoint}`;
                putData(reactUrl, symbol);
                reactionDiv.innerHTML = "";
                setTimeout(() => {
                    getData(completeUrl, token, reactionDiv, createReactions);
                }, 1000);
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

