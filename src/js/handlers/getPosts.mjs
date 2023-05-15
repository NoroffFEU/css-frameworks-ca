import * as postMethods from "../api/posts/index.mjs";
import * as templates from "../templates/index.mjs";

async function postsTemplates() {
    const posts = await postMethods.getPosts();
    const container = document.querySelector("#allPosts");
    templates.renderPostsTemplates(posts, container)
    console.log(posts)
}
postsTemplates();


async function singlePostTemplate() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    let id = params.get("id");
    console.log(id);

    const post = await postMethods.getPost(id);
    const container = document.querySelector("#singlePost");
    console.log(post);
    templates.renderSinglePostTemplate(post, container);
}
singlePostTemplate();


// async function commentsTemplates() {
//     const queryString = document.location.search;
//     const params = new URLSearchParams(queryString);
//     let id = params.get("id");
//     console.log(id);
//     const comments = await postMethods.getComments(id);
//     const container = document.querySelector("#getComments");
//     templates.renderCommentsTemplates(comments, container)
//     console.log(comments)
// }
// commentsTemplates();
