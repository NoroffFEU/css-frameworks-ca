import { getPost } from "../src/api/posts/id/getPost.js";
import { getAccessToken } from "../src/tools/accessToken.js";
import { isMediaValid } from "../src/tools/validMedia.js";
import { getUserName } from "../src/tools/NameLocalStorage.js";
import { deletePost } from "../src/api/posts/id/deletePost.js";
import { editPost } from "../src/api/posts/id/editPost.js";
import { newPost } from "../src/api/posts/newPost.js";

let params = new URLSearchParams(window.location.search);
let postId = params.get("postId");
let token = getAccessToken();

window.onload = processPost();

/**
 * Gets token and postId , uses it to get post's details from API and starts others functions
 */
async function processPost() {
    const post = await getPost(token, postId);
    showPost(post);
    setModalInputs(post);
    showComments();
    showReactions();
}

/**
 * Gets the value of search phrase provided in search input
 */
document.getElementById("searchBtn").addEventListener("click", () => {
    let searchWord = document.getElementById("searchInput").value;
    if (searchWord !== null && searchWord !== undefined && searchWord.length > 1) {
        window.location.href = `../feed/index.html?search=${searchWord}`;
    }
    else {
        //TODO: Bruk boostrap modal?
        alert("You have to provide a search phrase");
    }

});

/**
 * Shows the post sent from API; it also checks if there is any media included 
 * @param {object} object with post's details
 */
function showPost(post) {
    let containerHTMLCard = document.getElementById("singleCard");
    let setImg = "";
    let formattedDate = new Date(post.updated).toLocaleDateString();
    let formattedTime = new Date(post.updated).toLocaleTimeString();
    if (isMediaValid(post.media)) {
        setImg = post.media;
    } else {
        setImg = "../pics/jean-marc-vieregge-cDKqFb-NOZc-unsplash.jpg";
    }
    containerHTMLCard.innerHTML = `
        <div class="my-2 col col-lg-10 w-100">
            <div class="card shadow-sm"> 
                <img src="${setImg}" alt="Hanks of wool" class="bd-placeholder-img card-img-top" id="cardPicture">
                <h5 class="card-title" id="cardTitle">${post.title}</h5>
                <div class="card-body">
                <p class="card-text text-start" id="cardBody">${post.body}</p>
                <div class="card-text text-start py-2" id="cardTags">${tagsToHtml(post.tags, post.id)}</div>
                    <div class="d-flex justify-content-between align-items-start" id="btnAndDate">
                    <div class="py-2">   
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowAuthor">${post.author.name}</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowComments${post.id}" data-postid="${post.id}">Comments</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowReactions" data-postid="${post.id}">Reactions</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnEdit${post.id}" data-postid="${post.id}><a href="#" data-bs-toggle="modal" data-bs-target="#editPostModal">Edit</a></button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnDelete${post.id}" data-postid="${post.id}">Delete</button>
                        </div>
                    </div>
                    <div class="py-2">
                        <small class="text-muted p-2" id="cardUpdated">${formattedDate} ${formattedTime}</small>
                    </div>
                </div>
                <div class="showComments" id="showComments${post.id}" style="display:none;">
                ${processCommentsForPost(post.comments)}</div>
                <div class="showReactions" id="showReactions${post.id}" style="display:none;">
                ${processReactionsForPost(post.reactions)}</div>
            </div>
        </div>        
        `;
    let userName = getUserName();
    if (post.author.name === userName) {
        document.getElementById(`btnEdit${post.id}`).style.display = "block";
        document.getElementById(`btnDelete${post.id}`).style.display = "block";
    } else {
        document.getElementById(`btnEdit${post.id}`).style.display = "none";
        document.getElementById(`btnDelete${post.id}`).style.display = "none";
    }

    /**
    * Deletes user's post
    */
    document.getElementById(`btnDelete${post.id}`).addEventListener("click", () => {
        deletePost(token, postId);
        window.location.href = "../profile/index.html";
    });
}

/**
 * Shows tags as links
 * @param {array} array of tags
 * @param {number} post's Id
 * @returns {string} shows tags as links
 */
function tagsToHtml(tagsArray, postId) {
    let aString = "";
    for (let i = 0; i < tagsArray.length; i++) {
        aString += `
    <a href="../feed/index.html?tag=${tagsArray[i]}"><span class="card-text text-start" id="cardTags${postId}" data-tagId="tag">${tagsArray[i]}</span></a>
    ` }
    return aString;
}

/**
 * Opens modal and gets the values of a new message
 */
document.getElementById("postBtn").addEventListener("click", () => {
    const token = getAccessToken();
    const newPostTitle = document.getElementById("newPostInput1").value;
    const newPostMessage = document.getElementById("newPostInput2").value;
    const newPostTags = document.getElementById("newPostInput3").value.split(",");
    const newPostMedia = document.getElementById("newPostInput4").value;
    newPost(token, newPostTitle, newPostMessage, newPostTags, newPostMedia);
    processUserFeed();
});

/**
 * Puts values of user's post in inputs of the modal so the user can edit them
 * @param {} post 
 */
function setModalInputs(post) {
    let htmlTitle = document.getElementById("editPostInput1");
    htmlTitle.value = post.title;
    let htmlMessage = document.getElementById("editPostInput2");
    htmlMessage.value = post.body;
    let htmlTags = document.getElementById("editPostInput3");
    htmlTags.value = post.tags;
    let htmlMedia = document.getElementById("editPostInput4");
    htmlMedia.value = post.media;
}

/**
 * Gets the values of an edited message
 */
document.getElementById("editPostBtn").addEventListener("click", async () => {
    const editPostTitle = document.getElementById("editPostInput1").value;
    const editPostMessage = document.getElementById("editPostInput2").value;
    const editPostTags = document.getElementById("editPostInput3").value.split(",");
    const editPostMedia = document.getElementById("editPostInput4").value;
    const response = await editPost(token, postId, editPostTitle, editPostMessage, editPostTags, editPostMedia);
    window.location.href = `../singlePost/index.html?postId=${response.id}`;
});

/** 
 * Checks if a post has any comments and if it does, it puts them in Html; otherwise it creates the message that there are no comments
 * 
 * @param {array} comments 
 * @returns {array} array with comments and puts them in Html, if there are none it creates the message that there are no comments
 */
function processCommentsForPost(comments) {
    let commentsHtml = "";
    if (comments.length === 0) {
        commentsHtml = `
        <div>There are no comments</div>
         `;
    }
    for (let i = 0; i < comments.length; i++) {
        commentsHtml += `
        <div>${comments[i].body}</div>
        `;
    }
    return commentsHtml;
}


/** 
 * Checks if a post has any reactions and if it does, it puts them in Html; otherwise it creates the message that there are no reactions
 * 
 * @param {array} reactions 
 * @returns {array} array with reactions and puts them in Html, if there are none it creates the message that there are no reactions
 */
function processReactionsForPost(reactions) {
    let reactionsHtml = "";
    if (reactions.length === 0) {
        reactionsHtml = `
        <div>There are no reactions</div>
         `;
    }
    for (let i = 0; i < reactions.length; i++) {
        reactionsHtml += `
        <div>${reactions[i].symbol}</div>
        `;
    }
    return reactionsHtml;
}

/** 
 * Shows the post's comments or a message that there are none after the button is pressed
 */
function showComments() {
    const commentBtns = document.querySelectorAll('[id^="btnShowComments"]');
    commentBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            document.getElementById(`showComments${btn.dataset.postid}`).style.display = "block";
        })
    })
}

/** 
 * Shows the post's reactions or a message that there are none after the button is pressed
 */
function showReactions() {
    const reactionsBtns = document.querySelectorAll('[id^="btnShowReactions"]');
    reactionsBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            document.getElementById(`showReactions${btn.dataset.postid}`).style.display = "block";
        })
    })
}