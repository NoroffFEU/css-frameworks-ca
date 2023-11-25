import { formCheck } from "./components/formValidation.mjs";
import { characterCount } from "./components/formValidation.mjs";
import { submitForm } from "./components/submitForm.mjs";
import { makePost } from "./components/postActions.mjs";
import { printFeed } from "./components/getActions.mjs";
import { sortArray } from "./components/getActions.mjs";
import { searchArray } from "./components/getActions.mjs";
import { getData } from "./components/getData.mjs";
import { deletePost } from "./components/deleteData.mjs";
import { clearForm } from "./components/submitForm.mjs";

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


const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        const deleteBtns = document.querySelectorAll(".delete-post");
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.onclick = () => {
                const postToDelete = deleteBtn.id;
                const deleteURl = `${baseUrl}${endpoint}${postToDelete}`;
                deletePost(deleteURl);
                allPostsDom.innerHTML = "";
                setTimeout(() => {
                    getData(feedUrl, token, allPostsDom, printFeed);
                }, 1000);
            };
        });

        const editBtns = document.querySelectorAll(".edit-post");
        editBtns.forEach((editBtn) => {
            editBtn.onclick = () => {
                const postToEdit = editBtn.id;
                const editUrl = `${baseUrl}${endpoint}${postToEdit}`;
                console.log(editUrl); // FIX THIS LATER 
                // NEEDS TO BE  ABLE TO EDIT CONTENT AND POST THE FORM AGAIN 
                // innerHTML = `
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
                // getData(feedUrl, token, allPostsDom, printFeed);
            };
        });
    })
});


const config = {attributes: true, childList: true, subtree: true};

observer.observe(allPostsDom, config);