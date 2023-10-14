import { getData } from "../mjs/getData.mjs";
import { isMediaValid } from "../mjs/helpers.mjs";

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


// reset page to all posts
document.getElementById("homeBtn").addEventListener("click", () => {
    isShowingTodaysPosts = false;
    searchField.value = "";
    showPosts(feedPosts);
});

// search

const searchField = document.getElementById("searchInput");

searchField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const result = searchElement(feedPosts, searchField.value);
        // debugger;
        showPosts(result);
    }
});


function searchElement(postsArray, searchText) {
    return postsArray.filter((post) =>
        post.title.includes(searchText) || post.body.includes(searchText)
    );
}


// showing today's posts

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
        showPosts(todaysPosts);
        isShowingTodaysPosts = true;
    } else {
        showPosts(feedPosts);
        isShowingTodaysPosts = false;
    }
});


// showing posts
var containerHTMLCard = document.getElementById("singleCard");

async function fetchPostsFromApi() {
    feedPosts = await getData(`${postsUrl}?${queryString}`);
    showPosts(feedPosts);
}

function showPosts(posts) {
    //var posts = await getData(`${postsUrl}?${queryString}`);
    var setImg = "";
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
    showComments();
    showReactions();
}

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




// new post

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

function newPostValuesToObject(title, message, media) {
    const postToApi = {
        "title": title,
        "body": message,
        "media": media
    };
    return postToApi;
}

async function newPostToApiFunksjon(url, post) {
    try {
        const token = localStorage.getItem("accessToken");
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(post),
        };
        const response = await fetch(url, postData);
        const json = await response.json();

        //return json;
    } catch (error) {
        console.log(error)
    }
}


// show comments

function showComments() {
    const commentBtns = document.querySelectorAll('[id^="btnShowComments"]');

    commentBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            document.getElementById(`showComments${btn.dataset.postid}`).style.display = "block";
        })
    })
}

// show reactions
function showReactions() {
    const reactionsBtns = document.querySelectorAll('[id^="btnShowReactions"]');

    reactionsBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            document.getElementById(`showReactions${btn.dataset.postid}`).style.display = "block";
        })
    })
}