import { getData } from "./components/getData.mjs";
import { singlePostContent } from "./components/getActions.mjs";
import { characterCount } from "./components/formValidation.mjs";
import { formCheck } from "./components/formValidation.mjs";

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
const baseURL = "https://api.noroff.dev/api/v1";
const endpoint = `/social/posts/${id}/?_reactions=true&_author=true&_comments=true`;
const completeUrl = `${baseURL}${endpoint}`;
const postDOM = document.querySelector(".single-post");
const token = localStorage.getItem("accessToken");

getData(completeUrl, token, postDOM, singlePostContent);

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        const form = document.querySelector(".add-post-form");
        const fieldset = document.querySelector(".add-post-fieldset");
        const formInputs = fieldset.elements;
        const btn = document.querySelector(".add-post-btn");
        const textarea = document.querySelector("textarea");
        const counter = document.querySelector(".counter");
        const maxValText = document.querySelector(".max-val")
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

        const reactions = document.querySelectorAll(".reactions");
        reactions.forEach((react) => {
            react.onclick = () => {console.log("hello")}
        });

        const plusSymb = document.querySelector(".add-reaction");
        plusSymb.onclick = () => {console.log("goodbye")};
    })
});


const config = {attributes: true, childList: true, subtree: true};

observer.observe(postDOM, config);