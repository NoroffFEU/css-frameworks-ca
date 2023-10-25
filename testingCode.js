// This is my html code for the posts page. 
//Filepath: posts/index.html

// <!DOCTYPE html>
// <html lang="en">
//     <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Posts | Stronger together</title>
//         <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
//         <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
//         <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
//         <link rel="stylesheet" href="/dist/css/index.css" />
//         <script type="module" src="../src/js/index.js" defer></script>
//         <script
//             src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
//             integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
//             crossorigin="anonymous"
//             defer
//         ></script>
//     </head>
//     <body class="body-feed">
//         <header>
//             <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
//                 <div class="container-fluid">
//                     <h1 class="mb-0 lh-1"><a class="navbar-brand fs-1" href="#">STRONGER</a></h1>
//                     <button
//                         class="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span class="material-symbols-outlined display-3"> menu </span>
//                     </button>
//                     <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2 current" aria-current="page" href="#">Feed</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/profile/">Profile</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="../index.html">Sign out</a>
//                             </li>
//                         </ul>
//                         <form class="d-flex" role="search">
//                             <input class="form-control me-2 my-2" type="search" placeholder="Search" aria-label="Search" />
//                             <button class="btn btn-outline-success my-2" type="submit">Search</button>
//                         </form>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//         <main class="row g-0 m-0">
//             <section class="pb-5 text-center container feed__share">
//                 <div class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto py-5">
//                     <h1 class="text-center border-bottom border-primary border-3">Share your latest workout</h1>
//                     <div class="btn-share mt-3">
//                         <h3>Update followers on your latest achievements and get kudos for beeing a beast!</h3>
//                         <a href="/post/create/index.html" class="w-100 btn btn-lg btn-secondary btn-create mt-3">Create post</a>
//                     </div>
//                 </div>
//             </section>

//             <section class="feed__posts container bg-light py-5">
//                 <div class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
//                     <div class="row d-flex flex-column flex-sm-row justify-content-between ms-2 mb-3">
//                         <div class="feed__posts-heading ps-0">
//                             <h1 class="border-bottom border-primary border-3">Latest workouts</h1>
//                         </div>
//                         <select class="text-start fs-6 btn form-select form-control h-100" id="select-workout" required="">
//                             <option selected="" disabled="" value="">Sort by activity</option>
//                             <option>All activities</option>
//                             <option>Running outdors</option>
//                             <option>Weight lifting</option>
//                             <option>Body strength</option>
//                             <option>Yoga</option>
//                             <option>Skiing</option>
//                             <option>Cycling</option>
//                             <option>Spinning</option>
//                             <option>Threadmill</option>
//                             <option>Aerobic</option>
//                             <option>Stretching</option>
//                             <option>Crossfit</option>
//                             <option>Swimming</option>
//                             <option>Hiking</option>
//                             <option>Other</option>
//                         </select>
//                     </div>
//                     <div id="postList" class="col-12"></div>
//                 </div>
//             </section>
//         </main>
//     </body>
// </html>

// This is the post page.
// Filepath: post/index.html
// I want to go from posts/index.html to post/index.html by clicking on the "view more" button in a post in the list. Then I want to see post details for that specific post i clicked on in the post/index.html page. 
// The post should be in the div with id="postContainer".

// <!DOCTYPE html>
// <html lang="en">
//     <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Post | Stronger together</title>
//         <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
//         <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
//         <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
//         <link rel="stylesheet" href="/dist/css/index.css" />
//         <script
//             src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
//             integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
//             crossorigin="anonymous"
//             defer
//         ></script>
//         <script type="module" defer src="/src/js/index.js"></script>
//     </head>
//     <body class="body-feed">
//         <header>
//             <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
//                 <div class="container-fluid">
//                     <h1 class="mb-0 lh-1"><a class="navbar-brand fs-1" href="#">STRONGER</a></h1>
//                     <button
//                         class="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span class="material-symbols-outlined display-3"> menu </span>
//                     </button>
//                     <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/posts/">Feed</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/profile/">Profile</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/index.html">Sign out</a>
//                             </li>
//                         </ul>
//                         <form class="d-flex" role="search">
//                             <input class="form-control me-2 my-2" type="search" placeholder="Search" aria-label="Search" />
//                             <button class="btn btn-outline-success my-2" type="submit">Search</button>
//                         </form>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//         <main class="row g-0 m-0">
//             <section class="feed__posts container bg-light py-5">
//                 <div id="postContainer" class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto pt-5">
//                     <!-- Post goes here  -->
                    
//                 </div>
//             </section>
//         </main>
//     </body>
// </html>

//--------------------------------------------------------------------------------
// Code for filepath "src/js/api/constants.js":

export const API_HOST_URL = "https://api.noroff.dev";
export const API_BASE = "/api/v1";
export const API_SOCIAL_BASE = "/social";
export const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;

//-------------------------------------------------------------------------------------------
// Code for filepath: "src/js/storage/index.js":

export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function load(key) {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    } catch {
        return null;
    }
}

export function remove(key) {
    localStorage.removeItem(key);
}

//------------------------------------------------------
// Code for filepath "src/js/api/authFetch.js:

import { load } from "../storage/index.js";

export function headers() {
    const token = load("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function authFetch(url, options = {}) {
    return fetch(url, {
        ...options, //spread everything we are getting provided from postData
        headers: headers(),
    });
}

// ------------------------------------------------------------------
// Code for filepath "src/js/api/posts/read.js":

import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "get"; //do not have to write this

export async function getPosts() {
    const getPostURL = `${API_SOCIAL_URL}${action}`;

    const response = await authFetch(getPostURL);

    // console.log(await response.json());
    return await response.json();
}

export async function getPost(id) {
    if (!id) {
        throw new Error("Get requires a postID");
    }
    const getPostURL = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(getPostURL);

    // console.log(await response.json());
    return await response.json();
}

//-----------------------------------------------------------
// Code for filepath "src/js/api/posts/index.js":

export * from "./create.js";
export * from "./read.js";
export * from "./update.js";
export * from "./delete.js";

//------------------------------------------------------------------
// Code for filepath "src/js/templates/post.js":

export function postTemplate(postData) {
    const post = document.createElement("div");
    post.className = "card feed-post col-12 mb-3 pb-3";

    const innerDiv = document.createElement("div");
    innerDiv.className = "col-11 mx-auto pt-3";

    const dFlexDiv = document.createElement("div");
    dFlexDiv.className = "d-flex";

    const profileImageDiv = document.createElement("div");
    profileImageDiv.className = "mx-2 mb-2";

    const profileImage = document.createElement("img");
    profileImage.src = "../images/profile-1-harry-cunningham-EPi3TRQc5Z0-unsplash.jpg";
    profileImage.alt = "Profile image";
    profileImage.title = "Profile image";
    profileImage.width = "100%";
    profileImage.className = "card shadow-sm profile-image";

    profileImageDiv.appendChild(profileImage);

    const nameAndTitleDiv = document.createElement("div");
    nameAndTitleDiv.className = "nameAndTitleDiv";

    const nameHeading = document.createElement("h1");
    nameHeading.className = "feed-heading feed-name mb-0 fs-3";
    nameHeading.textContent = "Peter Peterson";

    const titleParagraph = document.createElement("p");
    titleParagraph.className = "feed-heading feed-title fs-2 lh-1";
    titleParagraph.textContent = postData.title;

    nameAndTitleDiv.appendChild(nameHeading);
    nameAndTitleDiv.appendChild(titleParagraph);

    dFlexDiv.appendChild(profileImageDiv);
    dFlexDiv.appendChild(nameAndTitleDiv);

    innerDiv.appendChild(dFlexDiv);

    const cardDiv = document.createElement("div");
    cardDiv.className = "card shadow-sm bg-light";

    if (postData.media) {
        const workoutImage = document.createElement("img");
        workoutImage.src = postData.media; // Use the API-provided image URL
        workoutImage.alt = `Image from post with title: ${postData.title}`;
        workoutImage.title = "Workout post image";
        workoutImage.className = "bd-placeholder-img card-img-top ";
        workoutImage.width = "100%";
        cardDiv.appendChild(workoutImage);
    }

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const cardTextParagraph = document.createElement("p");
    cardTextParagraph.className = "card-text";
    cardTextParagraph.textContent = postData.body;

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "d-flex justify-content-between align-items-center mb-3";

    const viewMoreButton = document.createElement("button");
    viewMoreButton.type = "button";
    viewMoreButton.className = "btn btn-sm btn-secondary";
    viewMoreButton.textContent = "View more";
    //Adding this to click on the button and read full post
    viewMoreButton.setAttribute("data-post-id", postData.id);

    const timeSmall = document.createElement("small");
    timeSmall.className = "text-muted";
    timeSmall.textContent = "9 mins";

    buttonDiv.appendChild(viewMoreButton);
    buttonDiv.appendChild(timeSmall);

    const commentDiv = document.createElement("div");
    commentDiv.className = "d-flex mb-3";

    const userImageDiv = document.createElement("div");
    userImageDiv.appendChild(profileImage.cloneNode(true));

    const commentParagraph = document.createElement("p");
    commentParagraph.className = "comment ms-1 p-2 w-100 mb-0";
    commentParagraph.textContent = "Hi there! Nice work! Would love to hear more about your marathon training! DM me!";

    commentDiv.appendChild(userImageDiv);
    commentDiv.appendChild(commentParagraph);

    const addCommentDiv = document.createElement("div");
    addCommentDiv.className = "add-comment input-group shadow-sm mb-1";

    const commentButton = document.createElement("button");
    commentButton.type = "button";
    commentButton.id = "button-addon1";
    commentButton.className = "btn btn-secondary";
    commentButton.textContent = "Comment";

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.className = "form-control";
    commentInput.placeholder = "Give some positive feedback!";
    commentInput.setAttribute("aria-label", "Example text with button addon");
    commentInput.setAttribute("aria-describedby", "button-addon1");

    addCommentDiv.appendChild(commentButton);
    addCommentDiv.appendChild(commentInput);

    cardBodyDiv.appendChild(cardTextParagraph);
    cardBodyDiv.appendChild(buttonDiv);
    cardBodyDiv.appendChild(commentDiv);
    cardBodyDiv.appendChild(addCommentDiv);

    cardDiv.appendChild(cardBodyDiv);

    innerDiv.appendChild(cardDiv);

    post.appendChild(innerDiv);

    return post;
}

export function renderPostTemplate(postData, parent) {
    //Put the post template inside the parent
    parent.append(postTemplate(postData));
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplate)); 
}

// ---------------------------------------------------------
// Code for this filepath: src/js/templates/index.js:

export * from "./post.js";

//-----------------------------------------------------------
// Code for filepath "src/js/index.js":

import * as listeners from "./handlers/index.js";
import * as templates from "./templates/index.js";
import * as postMethods from "./api/posts/index.js";

// Routing behaviour to make sure the wrong scripts are not running
const path = location.pathname;
console.log(path);

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

// Testing templates for rendering/showing POST and POSTS

async function renderPosts() {
    const posts = await postMethods.getPosts();
    const container = document.querySelector("#postList");
    templates.renderPostTemplates(posts, container);
}

renderPosts();


// this code in the post details page

<div class="d-flex align-items-center mb-3">
  <a href="/post/index.html?id=8309" class="btn btn-sm btn-secondary"><i class="bi bi-pencil-square"></i>
  Update</a>
  <a href="/post/index.html?id=8309" class="btn btn-sm btn-primary ms-2"><i class="bi bi-trash-fill"></i>
  Remove</a>
</div>


// -----------------------------------------------------------------------------------------
// Updating a post

I want to be able to update a post. So far I have these two js files. Can you tell me what I have to do to be able to click on the update link, go to the update form, get the data from the post and be able to edit that in the input fields? 

// This is the html from filepath "post/edit/index.html": 

// <!DOCTYPE html>
// <html lang="en">
//     <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Edit Post | Stronger together</title>
//         <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
//         <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
//         <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
//         <link rel="stylesheet" href="/dist/css/index.css" />
//         <!-- <script src="../src/js/bsFormValidation.js" defer></script> -->
//         <script type="module" src="/src/js/index.js" defer></script>
//         <script
//             src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
//             integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
//             crossorigin="anonymous"
//             defer
//         ></script>
//     </head>
//     <body class="body-feed">
//         <header>
//             <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
//                 <div class="container-fluid">
//                     <h1 class="mb-0 lh-1"><a class="navbar-brand fs-1" href="#">STRONGER</a></h1>
//                     <button
//                         class="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span class="material-symbols-outlined display-3"> menu </span>
//                     </button>
//                     <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/posts/">Feed</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/profile/">Profile</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/index.html">Sign out</a>
//                             </li>
//                         </ul>
//                         <form class="d-flex" role="search">
//                             <input class="form-control me-2 my-2" type="search" placeholder="Search" aria-label="Search" />
//                             <button class="btn btn-outline-success my-2" type="submit">Search</button>
//                         </form>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//         <main class="row g-0 m-0">
//             <section class="feed__posts container bg-light py-5">
//                 <div class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto pt-5">
//                     <!-- Edit post -->
//                     <div id="post" class="card feed-post col-12 mb-3 pb-3 mt-5">
//                         <form id="editPost" class="needs-validation" novalidate>
//                             <div class="row py-2 px-3">
//                                 <h1>Update Post</h1>

//                                 <div class="form-group mb-2 text-start">
//                                     <label for="" class="mb-0">Title</label>
//                                     <input type="text" class="form-control" name="title" placeholder="Give your workout a title" required maxlength="40" />
//                                 </div>

//                                 <div class="form-group mb-2 text-start">
//                                     <label class="mb-0">Body</label>
//                                     <textarea type="text" class="form-control" name="body" placeholder="Describe your workout" required></textarea>
//                                 </div>

//                                 <!-- <div class="form-group">
//                                     <input type="hidden" class="form-control" name="id" required />
//                                 </div> -->

//                                 <div class="form-group mb-2 text-start">
//                                     <label class="mb-0">Tags</label>
//                                     <input type="text" class="form-control" name="tags" />
//                                 </div>

//                                 <div class="form-group mb-2 text-start">
//                                     <label class="mb-0">Media</label>
//                                     <input type="url" class="form-control" name="media" placeholder="Paste in URL for image" />
//                                 </div>

//                                 <div class="btn-share mt-2">
//                                     <button class="w-100 btn btn-lg btn-secondary btn-create">Update Post</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </section>
//         </main>
//     </body>
// </html>



//------------------------------------------------
// This html code is from filepath "post/index.html?id=123":


// <!DOCTYPE html>
// <html lang="en">
//     <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Post | Stronger together</title>
//         <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16" />
//         <link rel="stylesheet" href="https://use.typekit.net/yyb1tse.css" />
//         <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
//         <link rel="stylesheet" href="/dist/css/index.css" />
//         <script
//             src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
//             integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
//             crossorigin="anonymous"
//             defer
//         ></script>
//         <script type="module" defer src="/src/js/index.js"></script>
//     </head>
//     <body class="body-feed">
//         <header>
//             <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
//                 <div class="container-fluid">
//                     <h1 class="mb-0 lh-1"><a class="navbar-brand fs-1" href="#">STRONGER</a></h1>
//                     <button
//                         class="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span class="material-symbols-outlined display-3"> menu </span>
//                     </button>
//                     <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/posts/">Feed</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/profile/">Profile</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link fs-4 p-1 px-lg-3 my-2 m-lg-2" href="/index.html">Sign out</a>
//                             </li>
//                         </ul>
//                         <form class="d-flex" role="search">
//                             <input class="form-control me-2 my-2" type="search" placeholder="Search" aria-label="Search" />
//                             <button class="btn btn-outline-success my-2" type="submit">Search</button>
//                         </form>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//         <main class="row g-0 m-0">
//             <section class="feed__posts container bg-light py-5">
//                 <div id="postContainer" class="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto pt-5">
//                     <!-- Post goes here  -->
                    
//                 </div>
//             </section>
//         </main>
//     </body>
// </html>

//-------------------------------------------------------------------

// This code is my updatePost file from filepath "src/js/handlers/updatePost.js":
import { getPost, updatePost } from "../api/posts/index.js";

//use this as a teemplate to write other eventlisteners

export async function setUpdatePostFormListener() {
    const form = document.querySelector("#editPost");
    // console.log(form);

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {

        //disable the form with the button before it is uploaded
        const button = form.querySelector("button");
        button.disabled = true;

        //loading the form
        const postEdit = await getPost(id);
        form.title.value = postEdit.title;
        form.body.value = postEdit.body;
        form.tags.value = postEdit.tags;
        form.media.value = postEdit.media;

        //Once we have loaded the form 
        button.disabled = false; 
        
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form); //provide the form data to this constructor
            const post = Object.fromEntries(formData.entries());

            const tagsInput = form.querySelector("input[name='tags']").value;
            const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
            post.tags = tagsArray;

            post.id = id;
            console.log("This is the updated post", post);

            // Send it to the API
            updatePost(post);
        });
    }
}

//----------------------------------------------------
//This is my index.js "src/js/index.js"

import * as listeners from "./handlers/index.js";

import * as templates from "./templates/index.js";
import * as postMethods from "./api/posts/index.js";

// Routing behaviour to make sure the wrong scripts are not running
const path = location.pathname;
console.log(path);


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

// Code added to click on view more and see post details:

if (location.pathname.includes("/post/index.html")) {
    // This block executes when you are on the post detail page
    const urlParams = new URLSearchParams(location.search);
    const postId = urlParams.get("id");

    async function renderPost() {
        // Fetch the specific post by ID using the getPost method
        const post = await postMethods.getPost(postId);
        const container = document.querySelector("#postContainer");
        templates.renderPostTemplate(post, container);
    }

    renderPost();
} else {
    // This block executes for the posts/index.html page
    // Include your existing code for rendering the list of posts
    async function renderPosts() {
        const posts = await postMethods.getPosts();
        const container = document.querySelector("#postList");
        templates.renderPostTemplates(posts, container);
    }

    renderPosts();
}

//---------------------------------------------

//Button for removing post in /templates/post.js

removeButton.id = "removePostLink";

// The post is in the div with id="postContainer"

// The div / post that will be deleted has this classnames
post.className = "card feed-post col-12 mb-3 pb-3";

// code from filepath posts/delete.js:
import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "delete";

export async function removePost(id) {
    if (!id) {
        throw new Error("Delete requires a postID");
    }
    const updatePostURL = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(updatePostURL, {
        method,
    });

    // const post = await response.json();
    // console.log(post);
    // return post

    return await response.json();
}

// Created a setRemovePostFormListene() function to handle removal of post in handlers/deletePost.js
import { removePost } from "../api/posts/index.js";

// const removePostLink = document.querySelector("#removePostLink");

//use this as a teemplate to write other eventlisteners

export async function setRemovePostFormListener() {
    const removePostLink = document.querySelector("#removePostLink");

    if (removePostLink) {
        removePostLink.addEventListener("click", async (event) => {
            event.preventDefault();

            const url = new URL(location.href);
            const id = url.searchParams.get("id");

            if (!postId) {
                alert("Post ID not found.");
                return;
            }

            try {
                await removePost(postId);
                // Redirect to the feed page (adjust the URL as needed)
                window.location.href = "/posts/"; // Change to your feed URL
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("An error occurred while deleting the post.");
            }
        });
    }
}

// code from index.js:
import * as listeners from "./handlers/index.js";

import * as templates from "./templates/index.js";
import * as postMethods from "./api/posts/index.js";


// Routing behaviour to make sure the wrong scripts are not running
const path = location.pathname;
console.log(path);

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
        // listeners.setRemovePostFormListener();
        break;
    default:
}

// Code added to click on view more and see post details:

if (location.pathname.includes("/post/index.html")) {
    // This block executes when you are on the post detail page
    const urlParams = new URLSearchParams(location.search);
    const postId = urlParams.get("id");

    async function renderPost() {
        // Fetch the specific post by ID using the getPost method
        const post = await postMethods.getPost(postId);
        const container = document.querySelector("#postContainer");
        templates.renderPostTemplate(post, container);
    }

    renderPost();
} else {
    // This block executes for the posts/index.html page
    // Include your existing code for rendering the list of posts
    async function renderPosts() {
        const posts = await postMethods.getPosts();
        const container = document.querySelector("#postList");
        templates.renderPostTemplates(posts, container);
    }

    renderPosts();
}



