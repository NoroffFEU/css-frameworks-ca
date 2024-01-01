import { getProfile } from "../src/api/profiles/posts.js";
import { getAccessToken } from "../src/tools/accessToken.js";
import { getUserName } from "../src/tools/NameLocalStorage.js";
import { isMediaValid } from "../src/tools/validMedia.js";

window.onload = processUserFeed();


/**
 * Gets token and user's name, uses them to get user's posts from API and send them to the next function
 */
async function processUserFeed() {
    const accessToken = getAccessToken();
    const userName = getUserName();
    const userPosts = await getProfile(accessToken, userName);
    showUserPosts(userPosts);
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
                <img src="${setImg}" alt="Hanks of wool" class="bd-placeholder-img card-img-top" id="cardPicture">
                <h5 class="card-title" id="cardTitle">${userPosts[i].title}</h5>
                <div class="card-body">
                <a href="../singlePost/index.html?postId=${userPosts[i].id}"><p class="card-text text-start" id="singlePost">Read more...</p></a>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-secondary" id="btnShowAuthor">${userPosts[i].author.name}</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowComments${userPosts[i].id}" data-postid="${userPosts[i].id}">Comments</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowReactions${userPosts[i].id}" data-postid="${userPosts[i].id}">Reactions</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnEdit${userPosts[i].id}" data-postid="${userPosts[i].id}">Edit</button>
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




