import * as postMethods from "../../api/posts/index.js";
import * as templates from "../../ui/components/postTemplate.js";
import displayMessage from "../../ui/components/displayMessage.js";
import { savePosts } from "../../storage/index.js";



export async function getPosts() {
    try {
        const posts = await postMethods.getMyPosts();
        const container = document.querySelector("#allPosts");
        templates.renderPostsTemplates(posts, container);
        savePosts(posts)
    } catch (error) {
        displayMessage("danger", error, "#message");
    }
}

export async function getPostById() {
    try {
        const queryString = document.location.search;
        const params = new URLSearchParams(queryString);
        let id = params.get("id");
    
        const post = await postMethods.getPost(id);
        const container = document.querySelector("#singlePost");
        console.log(post);
        templates.renderSinglePostTemplate(post, container);
    } catch (error) {
        displayMessage("danger", error, "#message");
    }
}

