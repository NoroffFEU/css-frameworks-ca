import * as postMethods from "../api/posts/index.mjs";
import * as templates from "../templates/index.mjs";

async function testTemplates() {
    const posts = await postMethods.getPosts();
    const container = document.querySelector("#allPosts");
    templates.renderPostTemplates(posts, container)
    console.log(posts)
}
testTemplates();


// async function testTemplate() {
//     const posts = await postMethods.getPosts();
//     const post = posts[99];
//     // const post = post.pop();
//     const container = document.querySelector("#post");
//     templates.renderPostTemplate(post, container);
//     console.log(post);
// }
// testTemplate();


