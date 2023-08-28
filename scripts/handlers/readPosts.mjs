import * as postMethods from "../api/posts/index.mjs"
import * as templates from "../templates/index.mjs"

export async function setReadPostsListener() {
    const posts = await postMethods.getPosts();
    const container = document.querySelector("#posts");
    templates.renderPostTemplates(posts, container);
}