import { getPosts } from "../src/api/posts/getPosts.js";
import { getAccessToken } from "../src/tools/accessToken.js";
import { isMediaValid } from "../src/tools/validMedia.js";
import { newPost } from "../src/api/posts/newPost.js";
import { getUserName } from "../src/tools/NameLocalStorage.js";

window.onload = processFeed();


/** 
* Gets token, uses it to get posts from API and send them to the next function
*/
async function processFeed() {
    let params = new URLSearchParams(window.location.search);
    let postTag = params.get("tag");

    const token = getAccessToken();
    const posts = await getPosts(token, postTag);
    showPosts(posts);
}



/** 
 * Shows the posts sent from API; it also checks if there is any media included 
 * 
 * @param {array} posts 
 * @returns {array} array with all the posts and shows them on the site
 */
function showPosts(posts) {
    let containerHTMLCard = document.getElementById("singleCard");
    let setImg = "";
    containerHTMLCard.innerHTML = "";
    for (let i = 0; i < posts.length; i++) {

        let formattedDate = new Date(posts[i].updated).toLocaleDateString();
        let formattedTime = new Date(posts[i].updated).toLocaleTimeString();
        if (isMediaValid(posts[i].media)) {
            setImg = posts[i].media;
        } else {
            setImg = "../pics/jean-marc-vieregge-cDKqFb-NOZc-unsplash.jpg";
        }

        containerHTMLCard.innerHTML += `
        <div class="my-2 col col-lg-10 w-100">
            <div class="card shadow-sm"> 
                <img src="${setImg}" alt="Hanks of wool" class="bd-placeholder-img card-img-top" id="cardPicture">
                <h5 class="card-title" id="cardTitle">${posts[i].title}</h5>
                <div class="card-body">
                <a href="../singlePost/index.html?postId=${posts[i].id}"><p class="card-text text-start" id="singlePost">Read more...</p></a>
               <div class="card-text text-start"> ${tagsToHtml(posts[i].tags, posts[i].id)} </div>
                <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <a href="../profile/index.html?userName=${posts[i].author.name}"><button type="button" class="btn btn-sm btn-secondary" id="btnShowAuthor">${posts[i].author.name}</button></a>
                        <button type="button" class="btn btn-sm btn-secondary" id="btnShowComments${posts[i].id}" data-postid="${posts[i].id}">Comments</button>
                        <button type="button" class="btn btn-sm btn-secondary" id="btnShowReactions" data-postid="${posts[i].id}">Reactions</button>

                        </div>
                        <small class="text-muted p-2" id="cardUpdated">${formattedDate} ${formattedTime}</small>
                    </div>
                </div>

            </div>
        </div>        
        `;
    }
}
/**
 * Shows tags as links
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
 * Gets the values of a new message
 */
document.getElementById("postBtn").addEventListener("click", async () => {
    const token = getAccessToken();
    const newPostTitle = document.getElementById("newPostInput1").value;
    const newPostMessage = document.getElementById("newPostInput2").value;
    const newPostTags = document.getElementById("newPostInput3").value.split(",");
    const newPostMedia = document.getElementById("newPostInput4").value;

    await newPost(token, newPostTitle, newPostMessage, newPostTags, newPostMedia);
    window.location.href = "../feed/index.html";
});

