import { getProfile } from "../src/api/profiles/posts.js";
import { getAccessToken } from "../src/tools/accessToken.js";
import { getUserName } from "../src/tools/NameLocalStorage.js";
import { isMediaValid } from "../src/tools/validMedia.js";
import { deletePost } from "../src/api/posts/id/deletePost.js";
import { newPost } from "../src/api/posts/newPost.js";
import { editPost } from "../src/api/posts/id/editPost.js";

let accessToken = getAccessToken();
window.onload = processUserFeed();


/**
 * Gets token and user's name, uses them to get user's posts from API and send them to the next function
 */

async function processUserFeed() {
    const userName = getUserName();
    const userPosts = await getProfile(accessToken, userName);
    showUserPosts(userPosts);
    showDelete();
    getIdToEdit();

}
/**
 * Gets and shows user's posts sent from API; it also checks if there is any media included and start functions that enable to show comments and reactions if the buttons are pressed
 * @param {array} posts posts from API
*/
function showUserPosts(userPosts) {
    let containerHTMLCard = document.getElementById("singleCardProfile");
    //Clear the page
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
                <div class="card-text text-start" id="cardTags${userPosts[i].id}">${userPosts[i].tags}</div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-secondary" id="btnShowAuthor">${userPosts[i].author.name}</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowComments${userPosts[i].id}" data-postid="${userPosts[i].id}">Comments</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowReactions${userPosts[i].id}" data-postid="${userPosts[i].id}">Reactions</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnEdit${userPosts[i].id}" data-postid="${userPosts[i].id}"><a href="#" data-bs-toggle="modal" data-bs-target="#editPostModal">Edit</a></button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnDelete${userPosts[i].id}" data-postid="${userPosts[i].id}">Delete</button>
                        </div>
                        <small class="text-muted" id="cardUpdated">${formattedDate} ${formattedTime}</small> 
                    </div>
                </div>
                
            </div>
        </div>        
        `;
    }
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
 * @param {} post
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

