// import { getPosts } from "../src/api/posts/getPosts";
// import { getPost } from "../src/api/posts/id/getPost";
import { getPost } from "../src/api/posts/id/getPost.js";
import { getAccessToken } from "../src/tools/accessToken.js";
import { isMediaValid } from "../src/tools/validMedia.js";
import { getUserName } from "../src/tools/NameLocalStorage.js";
import { deletePost } from "../src/api/posts/id/deletePost.js";
import { editPost } from "../src/api/posts/id/editPost.js";

let params = new URLSearchParams(window.location.search);
let postId = params.get("postId");
let token = getAccessToken();

window.onload = processPost();

/**
 * Gets token and postId , uses it to get post's details from API and send them to the next function
 */

async function processPost() {

    const post = await getPost(token, postId);
    showPost(post);
    setModalInputs(post);
}




/**
 * Shows the post sent from API; it also checks if there is any media included 
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
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-secondary" id="btnShowAuthor">${post.author.name}</button>
                        <button type="button" class="btn btn-sm btn-secondary" id="btnShowComments${post.id}" data-postid="${post.id}">Comments</button>
                        <button type="button" class="btn btn-sm btn-secondary" id="btnShowReactions" data-postid="${post.id}">Reactions</button>
                        <button type="button" class="btn btn-sm btn-secondary" id="btnEdit${post.id}" data-postid="${post.id}><a href="#" data-bs-toggle="modal" data-bs-target="#editPostModal">Edit</a></button>
                        <button type="button" class="btn btn-sm btn-secondary" id="btnDelete${post.id}" data-postid="${post.id}">Delete</button>
                        </div>
                        <small class="text-muted p-2" id="cardUpdated">${formattedDate} ${formattedTime}</small>
                    </div>
                </div>

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