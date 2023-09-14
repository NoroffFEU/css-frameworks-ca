import * as postMethods from "../api/posts/index.mjs"; 
import * as templates from "../templates/index.mjs"; 

document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault(); 
    const searchQuery = document.getElementById("search-input").value.trim().toLowerCase();
    filterPostsBySearch(searchQuery);
});


export async function filterPostsBySearch(query) {
    try {
        const allPosts = await postMethods.getPosts();
        const filteredPosts = allPosts.filter((post) => {
            const title = post.title.toLowerCase();
            const body = post.body.toLowerCase();
            return title.includes(query) || body.includes(query);
        });

        const container = document.querySelector("#posts");
        container.innerHTML = ""; 
        templates.renderPostTemplates(filteredPosts, container);
    } catch (error) {
        console.error("Error filtering posts:", error);
    }
}
