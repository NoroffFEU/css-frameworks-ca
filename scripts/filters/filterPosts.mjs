import * as postMethods from "../api/posts/index.mjs"; 
import * as templates from "../templates/index.mjs"; 

document.getElementById("applyFilters").addEventListener("click", applyFilters);
/**
 * applies filters based on user input , and updates the posts accordingly
 * @throws {Error} throws error on failure
 */
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
/**
 * retrieve the list of posts based on specified filter criteria
 * @param {boolean} hasImage - if true will filter posts with images
 * @param {boolean} hasTags - if true will filter posts with tags
 * @returns {Promise<Object[]>} - returns posts based on filter criteria
 */
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