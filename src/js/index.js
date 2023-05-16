import * as listeners from "./handlers/index.js";
//Fix the listener conflict 
const path = location.pathname;
if (path === '/post/edit/') {
    listeners.setUpdatePostFormListener()};


// import { removePost } from "./api/posts/index"
// removePost(6067);


// import * as postMethods from "./api/posts/index.mjs";
// import * as templates from "./templates/index.js";

// listeners.setDeletePostListener();
// console.log("deleta");
//Fix the listener conflict 
// const path = location.pathname;

// if (path === '/profile/register/') {
//     listeners.setRegisterFormListener()
// // } else if (path === '/profile/login/') {
// //     listeners.setLoginFormListener()
// } else if (path === '/post/create/') {
//     listeners.setCreatePostFormListener()
// } else 
// if (path === '/post/edit/') {
//     listeners.setUpdatePostFormListener()};



