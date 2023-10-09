// import * as constants from "./api/constants.js";

// // console.log(constants.API_HOST_URL);
// // console.log(constants.API_BASE);
// // console.log(constants.API_SOCIAL_BASE);
// console.log(constants.API_SOCIAL_URL);

// console.log("heipådeg");

import { setRegisterFormListener } from "./handlers/register.js";
import { setLoginFormListener } from "./handlers/login.js";
import * as templates from "./templates/index.js";
import * as postMethods from "./api/posts/index.js";
import { renderPostTemplate } from "./templates/index.js";

// import * as posts from "./api/posts/index.js";

const path = location.pathname;

if (path === "/") {
    setLoginFormListener();
} else if (path === "/profile/register/") {
    setRegisterFormListener();
}

// Testing templates post
async function testTemplate() {
    const posts = await postMethods.getPosts();
    const post = posts[45];
    const container = document.querySelector("#post");
    renderPostTemplate(post, container);
}

testTemplate();

// post.createPost();
// post.updatePost();
// post.removePost();
// post.getPost();
// post.getPosts().then(console.log);
// post.getPost(3725).then(console.log);

// updatePost({
//     id: 3719,
//     title: "Example post UPDATED UPDATED",
//     body: "Also an example UPDATED UPDATED",
// });

// removePost(3719);

// {"title":"Example post",
// "body":"Also an example",
// "tags":[],
// "media":null,
// "created":
// "2023-10-09T11:10:54.381Z",
// "updated":"2023-10-09T11:10:54.381Z",
// "id":3719,
// "_count":{"comments":0,"reactions":0}}
