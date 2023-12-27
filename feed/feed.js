import { getPosts } from "../src/api/posts/getPosts.js";
import { getAccessToken } from "../src/tools/accessToken.js";
import { isMediaValid } from "../src/tools/validMedia.js";


window.onload = processFeed();

/** 
* This function gets token, use it to get posts from API and send them to the next function
*/
async function processFeed() {
    const token = getAccessToken();
    const posts = await getPosts(token);
    showPosts(posts);
}



/** 
 * This function shows the posts sent from API; it also checks if there is any media included 
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
                    <p class="card-text text-start" id="cardBody">${posts[i].body}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-secondary" id="btnShowAuthor">${posts[i].author.name}</button>
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