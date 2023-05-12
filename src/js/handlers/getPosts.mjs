import * as postMethods from "../api/posts/index.mjs";
import * as templates from "../templates/index.mjs";

async function testTemplates() {
    const posts = await postMethods.getPosts();
    const container = document.querySelector("#allPosts");
    templates.renderPostTemplates(posts, container)
    console.log(posts)
}
testTemplates();


async function testTemplate() {
    const posts = await postMethods.getPosts();
    const post = posts[1];
    const container = document.querySelector("#singlePost");
    templates.renderPostTemplate(post, container);
    console.log(post);
}
testTemplate();


