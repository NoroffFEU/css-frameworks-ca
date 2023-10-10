import { getData } from "../mjs/getData.mjs";
import { isMediaValid } from "../mjs/helpers.mjs";

const mainApiUrl = "https://api.noroff.dev/api/v1";
const postsUrl = `${mainApiUrl}/social/posts`;
const requestParam = {
    _author: true
};
const queryString = new URLSearchParams(requestParam).toString();

const token = localStorage.getItem("accessToken");
let feedPosts = undefined;



let formattedDate = ""

const todaysPostsBtn = document.getElementById("todaysPosts");
todaysPostsBtn.addEventListener("click", async function (formattedDate) {
    debugger;
    const date = new Date();
    const dateToday = date.toLocaleString();
    if (dateToday === formattedDate) {
        await showPosts();
    }
});


// showing posts
var containerHTMLCard = document.getElementById("singleCard");

async function showPosts() {
    var posts = await getData(`${postsUrl}?${queryString}`);



    var setImg = "";



    for (var i = 0; i < posts.length; i++) {
        formattedDate = new Date(posts[i].updated).toLocaleDateString();
        let formattedTime = new Date(posts[i].updated).toLocaleTimeString();
        if (isMediaValid(posts[i].media)) {
            setImg = posts[i].media;
        } else {
            setImg = "../pics/jean-marc-vieregge-cDKqFb-NOZc-unsplash.jpg";
        }



        containerHTMLCard.innerHTML += `
        <div class="my-2 col col-lg-10">
            <div class="card shadow-sm"> 
                <img src="${setImg}" alt="Hanks of wool" class="bd-placeholder-img card-img-top" id="cardPicture">
                <h5 class="card-title" id="cardTitle">${posts[i].title}</h5>
                <div class="card-body">
                    <p class="card-text text-start" id="cardBody">${posts[i].body}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-secondary" id="btnShowAuthor">${posts[i].author.name}</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowComments">Comments</button>
                            
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowReactions">Reactions</button>
                           
                        </div>
                        <small class="text-muted" id="cardUpdated">${formattedDate} ${formattedTime}</small>
                        
                    </div>
                </div>
                <div id="showComments" style="display:none;">comments go here</div>
                <div id="showReactions" style="display:none;">reactions go here</div>
            </div>
        </div>        
        `;
    }

}

window.onload = showPosts();





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
    newPostToApiFunksjon(PostsUrl, newPost);
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




