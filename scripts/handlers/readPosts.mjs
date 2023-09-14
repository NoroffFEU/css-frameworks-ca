import * as postMethods from "../api/posts/index.mjs";
import * as templates from "../templates/index.mjs";

export async function setReadPostsListener() {
    const hasImage = document.getElementById("hasImage").checked;
    const hasTags = document.getElementById("hasTags").checked;

    const allPosts = await postMethods.getPosts();

    const filteredPosts = filterPosts(allPosts, hasImage, hasTags);

    const container = document.querySelector("#posts");
    container.innerHTML = "";
    templates.renderPostTemplates(filteredPosts, container);
}

function filterPosts(posts, hasImage, hasTags) {
    return posts.filter((post) => {

        if (hasImage && !post.image) {
            return false;
        }
        if (hasTags && (!post.tags || post.tags.length === 0)) {
            return false;
        }
        return true;
    });
}
