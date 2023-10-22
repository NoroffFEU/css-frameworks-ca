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
    case "/post/create/":
    case "/post/create/index.html":
        listeners.setCreatePostFormListener();
    case "/post/edit/":
    case "/post/edit/index.html":
        listeners.setUpdatePostFormListener();
    default:
}

//--------------------------------------------------------------
// Testing templates for rendering/showing POST and POSTS

// async function renderPost() {
//     const posts = await postMethods.getPosts();
//     console.log(posts);
//     const post = posts[11]; //Pick number in array, not id
//     console.log(post);
//     const container = document.querySelector("#postContainer");
//     templates.renderPostTemplate(post, container);
// }

// renderPost();

// async function renderPosts() {
//     const posts = await postMethods.getPosts();
//     console.log(posts);
//     const container = document.querySelector("#postList");
//     templates.renderPostTemplates(posts, container);
// }
// renderPosts();

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

// postMethods.removePost(7470);
// postMethods.getPosts().then(console.log);
// postMethods.getPost(7470).then(console.log);
//--------------------------------------------------------------------------------------
