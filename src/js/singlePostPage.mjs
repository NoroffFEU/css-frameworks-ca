import { getData } from "./components/getData.mjs";
import { singlePostContent } from "./components/getActions.mjs";
import { characterCount } from "./components/formValidation.mjs";
import { formCheck } from "./components/formValidation.mjs";
import { deletePost } from "./components/deleteData.mjs";
import { createReactions } from "./components/getActions.mjs";
import { createComments } from "./components/getActions.mjs";
import { postComment } from "./components/postActions.mjs";
import { submitForm } from "./components/submitForm.mjs";
import { putData } from "./components/putData.mjs";
import { clearForm } from "./components/submitForm.mjs";

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
const baseURL = "https://api.noroff.dev/api/v1";
let endpoint = `/social/posts/${id}/?_reactions=true&_author=true&_comments=true`;
const completeUrl = `${baseURL}${endpoint}`;
const postDOM = document.querySelector(".single-post");
const token = localStorage.getItem("accessToken");
const commentForm = document.querySelector(".add-post-form");
const fieldset = document.querySelector(".add-post-fieldset");
const commentformInputs = fieldset.elements;
const btn = document.querySelector(".add-post-btn");
const commentTextarea = document.querySelector(".form-control");
const counter = document.querySelector(".counter");
const maxValText = document.querySelector(".max-val");
const reactionDiv = document.querySelector(".reactions");
const commentDiv = document.querySelector(".comments");
const spanForError = document.querySelector(".error-msg");
const checkBox = document.querySelector("#plus-symbol-checkbox");
const allAddableEmojisBox = document.querySelector(".all-emojis");
const editDiv = document.querySelector(".edit-post-div");
const editForm = document.querySelector(".edit-post-form");
const editFormInputs = editForm.elements;
const cancelEdit = document.querySelector("#cancel-editing");

getData(completeUrl, token, postDOM, singlePostContent);
getData(completeUrl, token, reactionDiv, createReactions);
getData(completeUrl, token, commentDiv, createComments);


for (let i = 0; i < commentformInputs.length; i++) {
    const input = commentformInputs[i];
    input.onkeyup = () => {
        formCheck(commentformInputs, btn);
        characterCount(commentTextarea.value, counter, maxValText, 250, 15);
    }
}


cancelEdit.onclick = (e) => {
    postDOM.style.cssText = "display:block;";
    editDiv.style.cssText = "display:none;";
}

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    endpoint = `/social/posts/${id}`;
    const editCommentURL = `${baseURL}${endpoint}`;
    submitForm(editForm, editCommentURL, putData);
    clearForm(editFormInputs);
    postDOM.style.cssText = "display:block;";
    editDiv.style.cssText = "display:none;";
    setTimeout(() => {
        getData(completeUrl, token, postDOM, singlePostContent);
    }, 1000);
})

commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    endpoint = `/social/posts/${id}/comment`;
    const postCommentUrl = `${baseURL}${endpoint}`;
    submitForm(commentForm, postCommentUrl, postComment, spanForError);
    commentDiv.innerHTML="";
    clearForm(commentForm.elements)
    setTimeout(() => {
        getData(completeUrl, token, commentDiv, createComments);
    }, 1000);
});



checkBox.addEventListener("change", () => {
    if (checkBox.checked === true) {
        allAddableEmojisBox.style.cssText = "display: grid;";;
    } else {
        allAddableEmojisBox.style.cssText = "display: none;";
    }
});


const allAddableEmojis = document.querySelectorAll(".add-emoji");
allAddableEmojis.forEach((emoji) => {
    emoji.onclick = () => {
        let emojiText = emoji.textContent;
        endpoint = `/social/posts/${id}/react/${emojiText}`;
        const reactUrl = `${baseURL}${endpoint}`;
        putData(reactUrl, emojiText);
        reactionDiv.innerHTML = "";
        setTimeout(() => {
            getData(completeUrl, token, reactionDiv, createReactions);
        }, 1000);
    }
});




/**
 * An observer to look out for changes to the DOM  elements, 
 * This one makes deleteButtons work 
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
                postDOM.style.cssText = "display:none;";
                editDiv.style.cssText = "display:block";
            }
        });
    })
});

/**
 * Observes a DOM element for changes
 * Finds all reactions added to a single post, 
 * then adds onclick functionallity to add the same kind of reaction
 * to the post 
 */
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


    })
});

/**
 * Observes a DOM element for changes, in this case the allPostsDOM
 * If a user does not have a set avatar, this observer will replace the 
 * broken image icon with a placeholder icon
 */
const commentsObserver = new MutationObserver(function(mutations) {
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
postObserver.observe(postDOM, config);
reactionObserver.observe(reactionDiv, config);
commentsObserver.observe(commentDiv, config);

