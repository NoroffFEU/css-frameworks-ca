import * as post from "./api/posts/index.js"

import * as listeners from "./handlers/index.js";
// import * as postMethods from "./api/posts/index.mjs";
// import * as templates from "./templates/index.js";

// listeners.setDeletePostListener();
// console.log("deleta");
//Fix the listener conflict 
const path = location.pathname;

// if (path === '/profile/register/') {
//     listeners.setRegisterFormListener()
// // } else if (path === '/profile/login/') {
// //     listeners.setLoginFormListener()
// } else if (path === '/post/create/') {
//     listeners.setCreatePostFormListener()
// } else 
if (path === '/post/edit/') {
    listeners.setUpdatePostFormListener()};



