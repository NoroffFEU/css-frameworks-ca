// import * as listeners from "./handlers/index.mjs";
import * as postMethods from "./api/posts/index.mjs";
// import * as templates from "./templates/index.mjs";


//Fix the listener conflict 
// const path = location.pathname;

// if (path === '/profile/register/') {
//     listeners.setRegisterFormListener()
// // } else if (path === '/profile/login/') {
// //     listeners.setLoginFormListener()
// } else if (path === '/post/create/') {
//     listeners.setCreatePostFormListener()
// } else if (path === '/post/edit/') {
//     listeners.setUpdatePostFormListener()
// }


// async function testTemplate() {
//     const posts = await postMethods.getPosts();
//     const post = posts[99];
//     // const post = post.pop();
//     const container = document.querySelector("#post");
//     templates.renderPostTemplate(post, container);
//     console.log(post);
// }
// testTemplate();

// async function testTemplates() {
//     const posts = await postMethods.getPosts();
//     const container = document.querySelector("#allPosts");
//     templates.renderPostTemplates(posts, container)
//     console.log(posts)
// }
// testTemplates();

postMethods.createPost();
// post.updatePost();
// post.removePost();
// post.getPost(5549).then(console.log);
// post.getPosts().then(console.log)
