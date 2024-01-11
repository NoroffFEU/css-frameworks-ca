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
    let searchPhrase = params.get("search");

    const token = getAccessToken();
    const posts = await getPosts(token, postTag);



    if (searchPhrase) {
        const posts2 = searchesThroughPosts(posts, searchPhrase);
        showPosts(posts2);

    } else {
        showPosts(posts);
    }
    showComments();
    showReactions();
}

/**
 * Shows today's posts 
 */
document.getElementById("todaysPosts").addEventListener("click", async () => {
    const token = getAccessToken();
    const posts = await getPosts(token);

    let date = new Date();
    let dateToday = date.toLocaleDateString();
    debugger;
    const todaysPosts = posts.filter((post) => {
        if (dateToday === new Date(post.updated).toLocaleDateString()) {
            return true;
        } else {
            return false;
        }
    });
    showPosts(todaysPosts);
});





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
 * Searches through all posts 
 * @param {array} posts 
 * @param {string} searchWord 
 * @returns 
 */
function searchesThroughPosts(posts, searchWord) {
    let arrayWithSearchResults = [];
    let searchWordMinuscule = searchWord.toLowerCase();
    for (let i = 0; i < posts.length; i++) {
        const element = posts[i];

        if (posts[i].title !== null && posts[i].title.toLowerCase().includes(searchWordMinuscule)) {
            arrayWithSearchResults.push(element);
        }
        if (posts[i].body !== null && posts[i].body.toLowerCase().includes(searchWordMinuscule)) {
            arrayWithSearchResults.push(element);
        }
        if (posts[i].author.name !== null && posts[i].author.name.toLowerCase().includes(searchWordMinuscule)) {
            arrayWithSearchResults.push(element);
        }
        if (posts[i].author.email !== null && posts[i].author.email.toLowerCase().includes(searchWordMinuscule)) {
            arrayWithSearchResults.push(element);
        }
        posts[i].tags.forEach((tag) => {
            if (tag.toLowerCase().includes(searchWordMinuscule)) {
                arrayWithSearchResults.push(element);
            }
        });
        if (posts[i].id !== null && posts[i].id.toString().includes(searchWordMinuscule)) {
            arrayWithSearchResults.push(element);
        }
    }
    return arrayWithSearchResults;
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
            <div class="showComments" id="showComments${posts[i].id}" style="display:none;">
            ${processCommentsForPost(posts[i].comments)}</div>
            <div class="showReactions" id="showReactions${posts[i].id}" style="display:none;">
            ${processReactionsForPost(posts[i].reactions)}</div>
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