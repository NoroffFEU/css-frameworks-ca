import { getData } from "../mjs/getData.mjs";
import { newPostValuesToObject, newPostToApiFunksjon, isMediaValid, processCommentsForPost, processReactionsForPost, searchElement } from "../mjs/helpers.mjs";

const token = localStorage.getItem("accessToken");
const mainApiUrl = "https://api.noroff.dev/api/v1";
//const getMyPosts = `${mainApiUrl}/social/profiles/:name/posts`;
const postsUrl = `${mainApiUrl}/social/posts`;
const myName = localStorage.getItem("name");
const getMyPosts = `${mainApiUrl}/social/profiles/${myName}/posts`;
const myPostsUrl = `${mainApiUrl}/social/posts`;
let profilePosts = undefined;
let postIdEdit = undefined;

const requestParam = {
    _author: true,
    _comments: true,
    _reactions: true
    // offset: 100
};

const queryString = new URLSearchParams(requestParam).toString();

window.onload = getPosts();


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


/**This function gets and shows my posts sent from API; it also checks if there is any media included and start functions that enable to show comments and reactions if the buttons are pressed
 */
async function getPosts() {
    var containerHTMLCard = document.getElementById("singleCardProfile");
    //Clear the page
    containerHTMLCard.innerHTML = "";
    //profilePosts = await getData(getMyPosts);
    profilePosts = await getData(`${getMyPosts}?${queryString}`);
    let setImg = "";
    for (var i = 0; i < profilePosts.length; i++) {
        let formattedDate = new Date(profilePosts[i].updated).toLocaleDateString();
        let formattedTime = new Date(profilePosts[i].updated).toLocaleTimeString();
        if (isMediaValid(profilePosts[i].media)) {
            setImg = profilePosts[i].media;
        } else {
            setImg = "../pics/jean-marc-vieregge-cDKqFb-NOZc-unsplash.jpg";
        }

        containerHTMLCard.innerHTML += `
        <div class="my-2 col col-lg-10 w-100">
            <div class="card shadow-sm"> 
                <img src="${setImg}" alt="Hanks of wool" class="bd-placeholder-img card-img-top" id="cardPicture">
                <h5 class="card-title" id="cardTitle">${profilePosts[i].title}</h5>
                <div class="card-body">
                    <p class="card-text text-start" id="cardBody">${profilePosts[i].body}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowComments${profilePosts[i].id}" data-postid="${profilePosts[i].id}">Comments</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowReactions${profilePosts[i].id}" data-postid="${profilePosts[i].id}">Reactions</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnEdit${profilePosts[i].id}" data-postid="${profilePosts[i].id}">Edit</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnDelete${profilePosts[i].id}" data-postid="${profilePosts[i].id}">Delete</button>
                        </div>
                        <small class="text-muted" id="cardUpdated">${formattedDate} ${formattedTime}</small> 
                    </div>
                </div>
                <div class="showComments" id="showComments${profilePosts[i].id}" style="display:none;">${processCommentsForPost(profilePosts[i].comments)}</div>
                <div class="showReactions" id="showReactions${profilePosts[i].id}" style="display:none;">${processReactionsForPost(profilePosts[i].reactions)}</div>
            </div>
        </div>        
        `;

    }
    showComments();
    showReactions();
    //https://stackoverflow.com/questions/44162581/use-wildcard-to-find-specific-id-using-javascript
    //https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes

    // This for-loop gets the id of the post that user wants to delete and starts the function that does it when the button is pressed
    const deleteBtns = document.querySelectorAll('[id^="btnDelete"]');
    for (let i = 0; i < deleteBtns.length; i++) {
        const deleteBtn = deleteBtns[i];
        deleteBtn.addEventListener("click", async function () {
            const postId = deleteBtn.dataset.postid;
            await deletePost(postId);
        });
    }

    // This for-loop gets the id of the post that user wants to edit and starts the function that does it when the button is pressed
    const editBtns = document.querySelectorAll('[id^="btnEdit"]');
    for (let i = 0; i < editBtns.length; i++) {
        const editBtn = editBtns[i];
        editBtn.addEventListener("click", function () {
            const postId = editBtn.dataset.postid;
            editPost(postId);
        });
    }
}


/**This function deletes the post
 * 
 * @param {number} id 
 */
async function deletePost(id) {
    const deletePost = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        await fetch(`${myPostsUrl}/${id}`, deletePost);
        await getPosts();
    } catch (error) {
        console.log(error);
    }
}


/**
 * This function shows the modal and fills the modal post with post's details
 * 
 * @param {number} id 
 */
function editPost(id) {
    const editPostModal = document.getElementById("editPostModal");
    var myModal = new bootstrap.Modal(editPostModal, {
        backdrop: 'static', // You can set the backdrop behavior (static or true/false)
        keyboard: false,    // You can control whether the modal can be closed with the keyboard
        focus: true
    })
    const tmp = profilePosts.find(x => x.id == id);
    document.getElementById("exampleFormControlTextarea6").value = tmp.title;
    document.getElementById("exampleFormControlTextarea7").value = tmp.body;
    document.getElementById("exampleFormControlTextarea8").value = tmp.media;
    postIdEdit = id;
    myModal.show();
}


//This event listener open the module that enables to edit a post by taking the values of a title, message(body) and media; it also starts functions get those values and send them to API
document.getElementById("editPostBtn").addEventListener("click", async (event) => {
    event.preventDefault();

    const titlePost = formEditPost.elements[0];
    const messagePost = formEditPost.elements[1];
    const mediaPost = formEditPost.elements[2];

    const userTitlePost = titlePost.value;
    const userMessagePost = messagePost.value;
    const userMediaPost = mediaPost.value;

    const editedPost = editedPostValuesToObject(userTitlePost, userMessagePost, userMediaPost);
    await editedPostToApiFunksjon(`${myPostsUrl}/${postIdEdit}`, editedPost);
    postIdEdit = undefined;
    await getPosts();
});


/** This function puts the values of a title, message(body) and media in an object
 * 
 * @param {string} title 
 * @param {string} message 
 * @param {string} media 
 * @returns {object} object with key-value pairs of title, message(body) and media
 */
function editedPostValuesToObject(title, message, media) {
    const postToApi = {
        "title": title,
        "body": message,
        "media": media
    };
    return postToApi;
}


/** This function sends a created object (and assigned token) to API and replace the old one
 * 
 * @param {string} url 
 * @param {object} post 
 */
async function editedPostToApiFunksjon(url, post) {
    try {
        const token = localStorage.getItem("accessToken");
        const postData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(post),
        };
        let response = await fetch(url, postData);
        await response.json();
    } catch (error) {
        console.log(error)
    }
}


/** This functions shows the post's comments or a message that there are none after the button is pressed
 */
function showComments() {
    const commentBtns = document.querySelectorAll('[id^="btnShowComments"]');
    commentBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            document.getElementById(`showComments${btn.dataset.postid}`).style.display = "block";
        })
    })
}

/** This functions shows the post's reactions or a message that there are none after the button is pressed
 */
function showReactions() {
    const reactionsBtns = document.querySelectorAll('[id^="btnShowReactions"]');
    reactionsBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            document.getElementById(`showReactions${btn.dataset.postid}`).style.display = "block";
        })
    })
}

