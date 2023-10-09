// import * as constants from "./api/constants.js";

// // console.log(constants.API_HOST_URL);
// // console.log(constants.API_BASE);
// // console.log(constants.API_SOCIAL_BASE);
// console.log(constants.API_SOCIAL_URL);

// console.log("heipådeg");

import { setRegisterFormListener } from "./handlers/register.js";
import { setLoginFormListener } from "./handlers/login.js";
// import { createPost } from "./api/posts/create.js";
import { createPost } from "./api/posts/create.js";

// import * as posts from "./api/posts/index.js";

const path = location.pathname;

if (path === "/") {
    setLoginFormListener();
} else if (path === "/profile/register/") {
    setRegisterFormListener();
}

createPost({
    title: "Example post",
    body: "Also an example",
});
