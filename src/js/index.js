import * as listeners from "./handlers/index.js";
import * as templates from "./templates/index.js";
import * as postMethods from "./api/posts/index.js";

//-------------------------------------------------------
// Routing behaviour to make sure the wrong scripts are not running
const path = location.pathname;
console.log(path);

// if (path === "/index.html") {
//     listeners.setLoginFormListener();
// } else if (path === "/profile/register/") {
//     listeners.setRegisterFormListener();
// }
// } else if (path === "/post/create") {
//     listeners.setCreatePostListener();
// } else if (path === "/post/edit/") {
//     listeners.setUpdatePostListener;
// }

switch (location.pathname) {
    case "/":
    case "/index.html":
        listeners.setLoginFormListener();
        break;
    case "/profile/register/":
    case "/profile/register/index.html":
        listeners.setRegisterFormListener();
        break;
    // case "/post/":
    // case "/post/index.html":
    //     listeners.setRemovePostFormListener();
    //     break;
    case "/post/create/":
    case "/post/create/index.html":
        listeners.setCreatePostFormListener();
        break;
    case "/post/edit/":
    case "/post/edit/index.html":
        listeners.setUpdatePostFormListener();
        break;
    default:
}

//---------------------------------------------------------------------------
// Code to click on view more link and see post details:

if (location.pathname.includes("/post/index.html")) {
    // Executes for the post detail page
    const urlParams = new URLSearchParams(location.search);
    const postId = urlParams.get("id");

    if (postId) {
        async function renderPost() {
            // Fetch the specific post by ID using the getPost method
            const post = await postMethods.getPost(postId);
            const container = document.querySelector("#postContainer");
            templates.renderPostTemplate(post, container);
            console.log(post);

            // Get the current user's username from local storage
            const userName = localStorage.getItem("userName");
            // Trim it so it does not have the quotation marks on it
            const currentUserName = userName ? userName.trim().replace(/^"(.*)"$/, "$1") : null;
            console.log("currentUserName:", currentUserName);

            const authorName = post.author.name.trim();
            console.log("authorName:", authorName);

            //check if the current username from local storage matches the post author name in api
            if (currentUserName === post.author.name) {
                const removePostButton = document.querySelector("#removePostButton");
                const updatePostButton = document.querySelector("#updatePostButton");

                if (removePostButton && updatePostButton) {
                    removePostButton.style.display = "block";
                    updatePostButton.style.display = "block";
                    removePostButton.addEventListener("click", async (event) => {
                        event.preventDefault();
                        // Remove post
                        try {
                            await postMethods.removePost(postId);
                            // Message indicating the post has been deleted.
                            alert("Post has been deleted.");
                            // Remove the post UI from the page.
                            const postContainer = document.querySelector("#postContainer");
                            if (postContainer) {
                                templates.afterDeleteTemplate();
                            }
                        } catch (error) {
                            console.error("Error deleting post:", error);
                            alert("An error occurred while deleting the post.");
                        }
                    });
                }
            } else {
                const removePostButton = document.querySelector("#removePostButton");
                const updatePostButton = document.querySelector("#updatePostButton");
                if (removePostButton && updatePostButton) {
                    removePostButton.style.display = "none";
                    updatePostButton.style.display = "none";
                }
            }
        }

        renderPost();
    } else {
        templates.afterDeleteTemplateError();
    }
} else {
    // Executes for the posts/index.html page
    // Rendering the list of posts
    async function renderPosts() {
        const posts = await postMethods.getPosts();
        const goodPosts = postMethods.filterBadPostData(posts);
        console.log(goodPosts);
        const container = document.querySelector("#postList");
        templates.renderPostTemplates(goodPosts, container);
    }

    renderPosts();
}

//---------------------------------------------------------------
// Testing functions for filtering, sorting and that stuff

// function isPostTitleGood(post) {
//     return post.title.length > 3;
// }

// function doesPostHaveMedia(post) {
//     return Boolean(post.media && post.media.length);
// }

// function doesPostHaveBody(post) {
//     return post.body;
// }

// function doesPostMeetCriterias(post) {
//     return isPostTitleGood(post) && doesPostHaveMedia(post) && doesPostHaveBody(post);
// }

// function filterBadPostData(posts) {
//     return posts.filter(doesPostMeetCriterias);
// }

// async function test() {
//     const posts = await postMethods.getPosts();

//     const goodPosts = filterBadPostData(posts);

//     console.log("goodPosts:", goodPosts);
// }

// test();
//--------------------------------------------------------------
// Testing templates for rendering/showing POST and POSTS

// async function renderPosts() {
//     const posts = await postMethods.getPosts();
//     console.log(posts);
//     const container = document.querySelector("#postList");
//     templates.renderPostTemplates(posts, container);
// }
// renderPosts();

// async function renderPost(postId) {
//     const posts = await postMethods.getPosts(postId);
//     console.log(posts);
//     // const post = posts[11]; //Pick number in array, not id
//     // console.log(post);
//     const container = document.querySelector("#postContainer");
//     templates.renderPostTemplate(post, container);
// }

// renderPost();

// async function renderPosts() {
//     const posts = await postMethods.getPosts();
//     const container = document.querySelector("#postList");
//     templates.renderPostTemplates(posts, container);
// }

// renderPosts();

//---------------------------------------------------------------------------
//The code I had for rendering and updating posts before implementing removal of posts

// if (location.pathname.includes("/post/index.html")) {
//     // Executes for the post detail page
//     const urlParams = new URLSearchParams(location.search);
//     const postId = urlParams.get("id");

//         async function renderPost() {
//             // Fetch the specific post by ID using the getPost method
//             const post = await postMethods.getPost(postId);
//             const container = document.querySelector("#postContainer");
//             templates.renderPostTemplate(post, container);
//             console.log(post);
//         }

//         renderPost();

// } else {
//     // Executes for the posts/index.html page
//     // Rendering the list of posts
//     async function renderPosts() {
//         const posts = await postMethods.getPosts();
//         const container = document.querySelector("#postList");
//         templates.renderPostTemplates(posts, container);
//     }

//     renderPosts();
// }

//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
//Testing createPost, updatePost, removePost and getPost/getPosts function without a form

// postMethods.createPost({
//     title: "No time for resting, here we go testing",
//     body: "Test test test, No rest rest res",
//     media: "https://images.freeimages.com/images/large-previews/5aa/spooky-chillin-1258602.jpg",
// });

//Check for an id in network, choose the POST request and check response, add id in update

// postMethods.updatePost({
//     id: 7470,
//     title: "Time to take a break",
//     body: "Test test test, No rest rest res",
//     media: "https://images.freeimages.com/images/large-previews/5aa/spooky-chillin-1258602.jpg",
// });

// postMethods.removePost(id);
// postMethods.getPosts().then(console.log);
// postMethods.getPost(7470).then(console.log);
//--------------------------------------------------------------------------------------
