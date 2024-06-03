import { getPosts } from "../api/posts/get.mjs";
import { renderPostList } from "../templates/postTemplate.mjs";
import { renderAllPosts } from "./index.mjs";

export async function filterPosts() {
    const filterAllFeeds = document.getElementById("allFeeds");
    const filterByDate = document.getElementById("byDate");
    const filterByMedia = document.getElementById("byMedia");
    const feedContainer = document.getElementById("posts");

    const posts = await getPosts();

    filterAllFeeds.addEventListener("change", () => {
        feedContainer.innerHTML = "";
        if (filterAllFeeds.checked) {
            const postsNewOld = posts.sort((a, b) => new Date(b.created) - new Date(a.created));
            renderPostList(postsNewOld, feedContainer);
            filterByDate.checked = false;
            filterByMedia.checked = false;
        }
    });

    filterByDate.addEventListener("change", () => {
        feedContainer.innerHTML = "";
        if (filterByDate.checked) {
            posts.sort((a, b) => new Date(a.created) - new Date(b.created));
            renderPostList(posts, feedContainer);   
            filterAllFeeds.checked = false;
            filterByMedia.checked = false;
        }
    });

    filterByMedia.addEventListener("change", () => {
        feedContainer.innerHTML = "";
        if (filterByMedia.checked) {
            const mediaPosts = posts.filter(post => post.media).sort((a, b) => new Date(b.created) - new Date(a.created));
            renderPostList(mediaPosts, feedContainer);
            filterAllFeeds.checked = false;
            filterByDate.checked = false;
        }    
    });
    
    if (!filterAllFeeds.checked &&
        !filterByDate.checked &&
        !filterByMedia.checked) {
        renderAllPosts(posts, feedContainer);
    }

    document.addEventListener("DOMContentLoaded", () => {
        filterPosts();
    });
}


