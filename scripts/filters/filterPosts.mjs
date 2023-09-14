import * as postMethods from "../api/posts/index.mjs"; 
import * as templates from "../templates/index.mjs"; 

document.getElementById("applyFilters").addEventListener("click", applyFilters);

export async function applyFilters() {
    try {
        const hasImage = document.getElementById("hasImage").checked;
        const hasTags = document.getElementById("hasTags").checked;

        const filteredPosts = await getFilteredPosts(hasImage, hasTags);

        const container = document.querySelector("#posts");
        container.innerHTML = ""; 
        templates.renderPostTemplates(filteredPosts, container);
    } catch (error) {
        console.error("Error applying filters:", error);
    }
}

export async function getFilteredPosts(hasImage, hasTags) {
    const params = new URLSearchParams();
    if (hasImage) {
        params.append('hasImage', 'true');
    }
    if (hasTags) {
        params.append('hasTags', 'true');
    }

    const posts = await postMethods.getPosts();


    const filteredPosts = posts.filter((post) => {
        if (hasImage && (!post.media || post.media.trim() === "")) {
            return false; 
        }
        if (hasTags) {

            if (!post.tags || post.tags.every((tag) => !tag.trim())) {
                return false; 
            }
        }
        return true;
    });

    return filteredPosts;
}