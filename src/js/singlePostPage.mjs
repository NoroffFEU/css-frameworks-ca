import { getData } from "./components/getData.mjs";
import { singlePostContent } from "./components/getActions.mjs";

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
const baseURL = "https://api.noroff.dev/api/v1";
const endpoint = `/social/posts/${id}/?_reactions=true&_author=true&_comments=true`;
const completeUrl = `${baseURL}${endpoint}`;
const postDOM = document.querySelector(".single-post");
const token = localStorage.getItem("accessToken");

getData(completeUrl, token, postDOM, singlePostContent);

// postDOM.addEventListener("DOMSubtreeModified", (e) => {
//     const addReaction = document.querySelector(".add-reaction");
//     console.dir(addReaction);
//     addReaction.onclick = (e) => {console.log("hello")};
// });

let arr = [];
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        const reactions = document.querySelectorAll(".reactions");
        // console.log(reactions)
        // reactions.onclick = (e) => {console.log("hello")}
        reactions.forEach((react) => {
            react.onclick = (e) => {console.log("hello")}
        });

        const plusSymb = document.querySelector(".add-reaction");
        // console.dir(plusSymb);
        plusSymb.onclick = (e) => {console.log("goodbye")}
    })
});


const config = {attributes: true, childList: true, subtree: true};

observer.observe(postDOM, config);