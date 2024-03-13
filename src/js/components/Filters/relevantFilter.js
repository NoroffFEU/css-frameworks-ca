import { renderPosts } from "../../pages/feed/functions/renderPosts.js";
import { selectOption } from "./filterOption.js";

export async function relevantFilter(posts) {
    document.getElementById('relevantOption').addEventListener('click', async function() {
        selectOption('Relevant');
        posts.data.sort((a, b) => b._count.comments - a._count.comments);


        await renderPosts(posts);
    });
}
