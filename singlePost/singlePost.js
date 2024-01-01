// import { getPosts } from "../src/api/posts/getPosts";
// import { getPost } from "../src/api/posts/id/getPost";
import { getPost } from "../src/api/posts/id/getPost.js";
import { getAccessToken } from "../src/tools/accessToken.js";
import { isMediaValid } from "../src/tools/validMedia.js";
import { getUserName } from "../src/tools/NameLocalStorage.js";

let params = new URLSearchParams(window.location.search);
let postId = params.get("postId");


window.onload = processPost();

/**
 * Gets token and postId , uses it to get post's details from API and send them to the next function
 */

async function processPost() {
    const token = getAccessToken();
    const post = await getPost(token, postId);
    showPost(post);
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
                        <button type="button" class="btn btn-sm btn-secondary" id="btnEdit${post.id}" data-postid="${post.id}">Edit</button>
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
}
