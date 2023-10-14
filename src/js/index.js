import * as listeners from "./handlers/index.js";
import * as templates from "./templates/index.js";
import * as postMethods from "./api/posts/index.js";

// import * as constants from "./api/constants.js";

// // console.log(constants.API_HOST_URL);
// // console.log(constants.API_BASE);
// // console.log(constants.API_SOCIAL_BASE);
// console.log(constants.API_SOCIAL_URL);

// console.log("heipådeg");

// import { setRegisterFormListener } from "./handlers/register.js";
// import { setLoginFormListener } from "./handlers/login.js";

// import { setCreatePostListener } from "./handlers/createPost.js";
// import { setUpdatePostListener } from "./handlers/updatePost.js";
// import { renderPostTemplate } from "./templates/index.js";

// import * as posts from "./api/posts/index.js";

const path = location.pathname;

if (path === "/") {
    listeners.setLoginFormListener();
} else if (path === "/profile/register/") {
    listeners.setRegisterFormListener();
} else if (path === "/post/create") {
    listeners.setCreatePostListener();
} else if (path === "/post/edit/") {
    listeners.setUpdatePostListener;
}

// // Testing templates post
// async function renderPosts() {
//     const posts = await postMethods.getPosts();
//     console.log(posts);
//     // const post = posts[24];
//     const container = document.querySelector("#postList");
//     templates.renderPostTemplates(posts, container);
// }

// renderPosts();

// async function testTemplate() {
//     const posts = await postMethods.getPosts();
//     console.log(posts);
//     // const post = posts[24];
//     const container = document.querySelector("#post");
//     templates.renderPostTemplates(posts, container);
// }

// testTemplate();

// postMethods.createPost();
// post.updatePost();
// post.removePost();
// postMethods.getPost();
// postMethods.getPosts().then(console.log);
// postMethods.getPost(3725).then(console.log);

// postMethods.createPost({
//     title: "Create post title",
//     body: "CreatePost body",
//     tags: "ThisIsATag",
//     },
// });

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
