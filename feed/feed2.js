//TODO: Slett fil

import { getData } from "../mjs/getData.mjs";
import { newPostValuesToObject, newPostToApiFunksjon, isMediaValid, processCommentsForPost, processReactionsForPost, searchElement } from "../mjs/helpers.mjs";

const mainApiUrl = "https://api.noroff.dev/api/v1";
const postsUrl = `${mainApiUrl}/social/posts`;
const requestParam = {
    _author: true,
    _comments: true,
    _reactions: true
    // offset: 100
};

const queryString = new URLSearchParams(requestParam).toString();
let feedPosts = undefined;
let isShowingTodaysPosts = false;

window.onload = fetchPostsFromApi();



// This event listener resets page and shows again to all the posts (after the button "Today's Post" was pressed) 
document.getElementById("homeBtn").addEventListener("click", () => {
    isShowingTodaysPosts = false;
    searchField.value = "";
    renderPage(feedPosts);
});


// This event listener sends search value from search field when Enter is pressed to a function that will check it
const searchField = document.getElementById("searchInput");
searchField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const result = searchElement(feedPosts, searchField.value);
        renderPage(result);
    }
});


/** 
 * This function sets up other functions
 * 
 * @param {array} posts posts from API
 */
function renderPage(posts) {
    showPosts(posts);
    showComments();
    showReactions();
}


// This event listener checks and change the format of date and time of posts and starts function that shows only today's posts
const todaysPostsBtn = document.getElementById("todaysPosts");
todaysPostsBtn.addEventListener("click", function () {
    if (isShowingTodaysPosts === false) {
        const date = new Date();
        const dateToday = date.toLocaleDateString();
        const todaysPosts = feedPosts.filter((post) => {
            if (new Date(post.updated).toLocaleDateString() === dateToday) {
                return true;
            } else {
                return false;
            }
        });
        renderPage(todaysPosts);
        isShowingTodaysPosts = true;
    } else {
        renderPage(feedPosts);
        isShowingTodaysPosts = false;
    }
});


let containerHTMLCard = document.getElementById("singleCard");
/** 
* This function gets posts from API and send them to next function that shows them on the site
*/
async function fetchPostsFromApi() {
    feedPosts = await getData(`${postsUrl}?${queryString}`);
    renderPage(feedPosts);
}


/** 
 * This function shows the posts sent from API; it also checks if there is any media included and start functions that enable to show comments and reactions if the buttons are pressed
 * 
 * @param {array} posts 
 * @returns {array} array with all the posts and shows them on the site
 */
function showPosts(posts) {
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
                <div class="showComments" id="showComments${posts[i].id}" style="display:none;">${processCommentsForPost(posts[i].comments)}</div>
                <div class="showReactions" id="showReactions${posts[i].id}" style="display:none;">${processReactionsForPost(posts[i].reactions)}</div>
            </div>
        </div>        
        `;
    }
}


//This event listener open the module that enables to write a new post by taking the values of a title, message(body) and media; it also starts functions get those values and send them to API
const formPost = document.getElementById("formPost");
document.getElementById("postBtn").addEventListener("click", (event) => {
    event.preventDefault();

    const titlePost = formPost.elements[0];
    const messagePost = formPost.elements[1];
    const mediaPost = formPost.elements[2];

    const userTitlePost = titlePost.value;
    const userMessagePost = messagePost.value;
    const userMediaPost = mediaPost.value;

    const newPost = newPostValuesToObject(userTitlePost, userMessagePost, userMediaPost);
    newPostToApiFunksjon(postsUrl, newPost);
});


/** 
 * This functions shows the post's comments or a message that there are none after the button is pressed
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
 * This functions shows the post's reactions or a message that there are none after the button is pressed
 */
function showReactions() {
    const reactionsBtns = document.querySelectorAll('[id^="btnShowReactions"]');
    reactionsBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            document.getElementById(`showReactions${btn.dataset.postid}`).style.display = "block";
        })
    })
}