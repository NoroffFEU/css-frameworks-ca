import { getData } from "../mjs/getData.mjs";
import { isMediaValid } from "../mjs/helpers.mjs";

const token = localStorage.getItem("accessToken");
const mainApiUrl = "https://api.noroff.dev/api/v1";
//const getMyPosts = `${mainApiUrl}/social/profiles/:name/posts`;
const myName = localStorage.getItem("name");
const getMyPosts = `${mainApiUrl}/social/profiles/${myName}/posts`;
const myPostsUrl = `${mainApiUrl}/social/posts`;
let profilePosts = undefined;
let postIdEdit = undefined;

window.onload = getPosts();




// showing my posts
async function getPosts() {
    var containerHTMLCard = document.getElementById("singleCardProfile");
    //Clear the page
    containerHTMLCard.innerHTML = "";

    profilePosts = await getData(getMyPosts);
    let setImg = "";

    for (var i = 0; i < profilePosts.length; i++) {

        if (isMediaValid(profilePosts[i].media)) {
            setImg = profilePosts[i].media;
        } else {
            setImg = "../pics/jean-marc-vieregge-cDKqFb-NOZc-unsplash.jpg";
        }

        containerHTMLCard.innerHTML += `
        <div class="my-2 col col-lg-10">
            <div class="card shadow-sm"> 
                <img src="${setImg}" alt="Hanks of wool" class="bd-placeholder-img card-img-top" id="cardPicture">
                <h5 class="card-title" id="cardTitle">${profilePosts[i].title}</h5>
                <div class="card-body">
                    <p class="card-text text-start" id="cardBody">${profilePosts[i].body}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowComments">Comments</button>
                            
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowReactions">Reactions</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnEdit${profilePosts[i].id}" data-postid="${profilePosts[i].id}">Edit</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnDelete${profilePosts[i].id}" data-postid="${profilePosts[i].id}">Delete</button>
                        </div>
                        <small class="text-muted" id="cardUpdated">${profilePosts[i].updated}</small>
                        
                    </div>
                </div>
                <div id="showComments" style="display:none;">comments go here</div>
                <div id="showReactions" style="display:none;">reactions go here</div>
            </div>
        </div>        
        `;

    }

    //https://stackoverflow.com/questions/44162581/use-wildcard-to-find-specific-id-using-javascript
    //https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    const deleteBtns = document.querySelectorAll('[id^="btnDelete"]');

    for (let i = 0; i < deleteBtns.length; i++) {
        const deleteBtn = deleteBtns[i];
        deleteBtn.addEventListener("click", async function () {
            const postId = deleteBtn.dataset.postid;
            await deletePost(postId);
        });
    }

    //getting edit post id
    const editBtns = document.querySelectorAll('[id^="btnEdit"]');

    for (let i = 0; i < editBtns.length; i++) {
        const editBtn = editBtns[i];
        editBtn.addEventListener("click", async function () {

            const postId = editBtn.dataset.postid;
            editPost(postId);
        });
    }



}




// delete post
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


// edit post

function editPost(id) {
    //need to get the form with the values
    const exampleModal = document.getElementById("exampleModal");
    var myModal = new bootstrap.Modal(exampleModal, {
        backdrop: 'static', // You can set the backdrop behavior (static or true/false)
        keyboard: false,    // You can control whether the modal can be closed with the keyboard
        focus: true
    })

    const tmp = profilePosts.find(x => x.id == id);

    document.getElementById("exampleFormControlTextarea1").value = tmp.title;
    document.getElementById("exampleFormControlTextarea2").value = tmp.body;
    document.getElementById("exampleFormControlTextarea3").value = tmp.media;
    postIdEdit = id;
    myModal.show();
}



document.getElementById("postBtn").addEventListener("click", async (event) => {

    event.preventDefault();

    const titlePost = formPost.elements[0];
    const messagePost = formPost.elements[1];
    const mediaPost = formPost.elements[2];

    const userTitlePost = titlePost.value;
    const userMessagePost = messagePost.value;
    const userMediaPost = mediaPost.value;

    const newPost = newPostValuesToObject(userTitlePost, userMessagePost, userMediaPost);
    await editedPostToApiFunksjon(`${myPostsUrl}/${postIdEdit}`, newPost);
    postIdEdit = undefined;
    await getPosts();
});

function newPostValuesToObject(title, message, media) {
    const postToApi = {
        "title": title,
        "body": message,
        "media": media
    };
    return postToApi;
}

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
        const response = await fetch(url, postData);
        const json = await response.json();

        //return json;
    } catch (error) {
        console.log(error)
    }
}



// fetching all posts, but only mine would be possible to edit or delate = buttons visible
//1. like in delete - on click you activate a editing of a certain post
// 2. showing modal with the title and text of the chosen post
// 3. fixing the post and sending it back to API with PUT method