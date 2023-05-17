import * as postMethods from "../api/posts/index.js";
import * as templates from "../templates/index.js";
import { search } from "../handlers/search.js";

export async function postsTemplates() {
    const posts = await postMethods.getMyPosts();
    const searchBtn = document.querySelector("#searchBtn");
    const container = document.querySelector("#allPosts");
    templates.renderPostsTemplates(posts, container)
    searchBtn.addEventListener("click", search);
}



export async function singlePostTemplate() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    let id = params.get("id");
    console.log(id);

    const post = await postMethods.getPost(id);
    const container = document.querySelector("#singlePost");
    console.log(post);
    templates.renderSinglePostTemplate(post, container);
}

