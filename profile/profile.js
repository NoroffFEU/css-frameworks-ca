import { getProfile } from "../src/api/profiles/posts.js";
import { getAccessToken } from "../src/tools/accessToken.js";
import { getUserName } from "../src/tools/nameLocalStorage.js";
import { isMediaValid } from "../src/tools/validMedia.js";
import { deletePost } from "../src/api/posts/id/deletePost.js";
import { newPost } from "../src/api/posts/newPost.js";
import { editPost } from "../src/api/posts/id/editPost.js";
import { getUserData } from "../src/api/profiles/profileData.js";
import { signOut } from "../src/tools/signOut.js";

let params = new URLSearchParams(window.location.search);
let userName = params.get("userName");
if (userName === null) {
    userName = getUserName();
}

let accessToken = getAccessToken();
window.onload = processUserFeed();

/**
 * Processes profile site and starts other functions
 */
async function processUserFeed() {
    const userPosts = await getProfile(accessToken, userName);
    const userData = await getUserData(accessToken, userName);
    showUserPosts(userPosts);
    showDelete();
    getIdToEdit();
    showUserProfile(userData);
    showComments();
    showReactions();
}

/**
 * Starts function that deletes all data from LocalStorage
 */
document.getElementById("signOut").addEventListener("click", signOut);

/**
 * Gets the value of search phrase provided in search input
 */
document.getElementById("searchBtn").addEventListener("click", () => {
    let searchWord = document.getElementById("searchInput").value;
    if (searchWord !== null && searchWord !== undefined && searchWord.length > 1) {
        window.location.href = `../feed/index.html?search=${searchWord}`;
    }
    else {
        alert("You have to provide a search phrase");
    }

});

/**
 * Shows user's profile
 * @param {object} userData object that includes user's name and avatar
 */
function showUserProfile(userData) {
    let userCardContainer = document.getElementById("contUsersCardBody");
    userCardContainer.innerHTML = `
    <div class="col-lg-4 ">
    <img src="${userData.avatar}" class="bd-placeholder-img rounded-circle2 border img-fluid" width="240" height="240" id="profileImg" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
    <h1 class="fw-normal  my-4">${userData.name}</h1>
  </div>
  `;
}

/**
 * Gets and shows user's posts sent from API; it also checks if there is any media included and start functions that enable to show comments and reactions if the buttons are pressed
 * @param {array} posts posts from API
*/
function showUserPosts(userPosts) {
    let containerHTMLCard = document.getElementById("singleCardProfile");
    containerHTMLCard.innerHTML = "";
    let setImg = "";
    for (var i = 0; i < userPosts.length; i++) {
        let formattedDate = new Date(userPosts[i].updated).toLocaleDateString();
        let formattedTime = new Date(userPosts[i].updated).toLocaleTimeString();
        if (isMediaValid(userPosts[i].media)) {
            setImg = userPosts[i].media;
        } else {
            setImg = "../pics/jean-marc-vieregge-cDKqFb-NOZc-unsplash.jpg";
        }
        containerHTMLCard.innerHTML += `
        <div class="my-2 col col-lg-10 w-100">
            <div class="card shadow-sm"> 
                <img src="${setImg}" alt="Hanks of wool" class="bd-placeholder-img card-img-top" id="cardPicture${userPosts[i].id}">
                <h5 class="card-title" id="cardTitle${userPosts[i].id}">${userPosts[i].title}</h5>
                <div class="card-body">
                <a href="../singlePost/index.html?postId=${userPosts[i].id}"><p class="card-text text-start" id="singlePost">Read more...</p></a>
                <p class="card-text text-start" id="cardBody${userPosts[i].id}" style="display:none;" >${userPosts[i].body}</p>
                <div class="card-text text-start py-2" id="cardTags${userPosts[i].id}">
                    ${tagsToHtml(userPosts[i].tags, userPosts[i].id)}
                </div>
                <div class="d-flex justify-content-between align-items-start" id="btnAndDate">
                    <div class="py-2">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowAuthor">${userPosts[i].author.name}</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowComments${userPosts[i].id}" data-postid="${userPosts[i].id}">Comments</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowReactions${userPosts[i].id}" data-postid="${userPosts[i].id}">Reactions</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnEdit${userPosts[i].id}" data-postid="${userPosts[i].id}"><a href="#" data-bs-toggle="modal" data-bs-target="#editPostModal">Edit</a></button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnDelete${userPosts[i].id}" data-postid="${userPosts[i].id}">Delete</button>
                        </div>
                    </div>
                    <div class="py-2">
                        <small class="text-muted" id="cardUpdated">${formattedDate} ${formattedTime}</small> 
                    </div>
                </div>
                <div class="showComments" id="showComments${userPosts[i].id}" style="display:none;">
                ${processCommentsForPost(userPosts[i].comments)}</div>
                <div class="showReactions" id="showReactions${userPosts[i].id}" style="display:none;">
                ${processReactionsForPost(userPosts[i].reactions)}</div>
            </div>
        </div>        
        `;
        if (userName === getUserName()) {
            document.getElementById(`btnEdit${userPosts[i].id}`).style.display = "block";
            document.getElementById(`btnDelete${userPosts[i].id}`).style.display = "block";
        } else {
            document.getElementById(`btnEdit${userPosts[i].id}`).style.display = "none";
            document.getElementById(`btnDelete${userPosts[i].id}`).style.display = "none";
        }
    }
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
 * Adds event listener to delete button in user's post
 */
function showDelete() {
    const deleteBtns = document.querySelectorAll('[id^="btnDelete"]');
    for (let i = 0; i < deleteBtns.length; i++) {
        const deleteBtn = deleteBtns[i];
        deleteBtn.addEventListener("click", async function () {
            const postId = deleteBtn.dataset.postid;
            await deletePost(accessToken, postId);
            processUserFeed();
        });
    }
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
 * Gets post's id to be able to edit the post
 */
function getIdToEdit() {
    const editBtns = document.querySelectorAll('[id^="btnEdit"]');
    for (let i = 0; i < editBtns.length; i++) {
        const editBtn = editBtns[i];
        editBtn.addEventListener("click", async function () {
            const postId = editBtn.dataset.postid;
            setModalInputs(getPostDataFromHtml(postId));
            putPostUpdate(postId);
        });
    }
}

/**
 * Puts values of user's post in inputs of the modal so the user can edit them
 * @param {string} postId
 * @returns {object} object with value of post's id, title, body, tags and media
 */
function getPostDataFromHtml(postId) {
    let htmlTitle = document.getElementById(`cardTitle${postId}`);
    let htmlMessage = document.getElementById(`cardBody${postId}`);
    let htmlTags = document.getElementById(`cardTags${postId}`);
    let htmlMedia = document.getElementById(`cardPicture${postId}`);
    const postData = {
        id: postId,
        title: htmlTitle.innerText,
        body: htmlMessage.innerText,
        tags: htmlTags.innerText,
        media: htmlMedia.currentSrc
    }
    return postData;
}

/**
 * Puts values of user's post in inputs of the modal so the user can edit them
 * @param {object} post 
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
 * @param {string} postId
 */
function putPostUpdate(postId) {
    document.getElementById("editPostBtn").addEventListener("click", async () => {
        const editPostTitle = document.getElementById("editPostInput1").value;
        const editPostMessage = document.getElementById("editPostInput2").value;
        const editPostTags = document.getElementById("editPostInput3").value.split(",");
        const editPostMedia = document.getElementById("editPostInput4").value;
        const response = await editPost(accessToken, postId, editPostTitle, editPostMessage, editPostTags, editPostMedia);
        window.location.href = `../singlePost/index.html?postId=${response.id}`;
    });
}

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