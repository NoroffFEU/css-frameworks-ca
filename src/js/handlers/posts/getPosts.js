import * as postMethods from "../../api/posts/index.js";
import * as templates from "../../ui/components/postTemplate.js";
import { search } from "./search.js";

export async function postsTemplates() {
    try {

        const posts = await postMethods.getMyPosts();
        const searchBtn = document.querySelector("#searchBtn");
        const container = document.querySelector("#allPosts");
        templates.renderPostsTemplates(posts, container)
        searchBtn.addEventListener("click", search);
    } catch (error) {
        console.log("Couldn't retrieve posts");
    }
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

