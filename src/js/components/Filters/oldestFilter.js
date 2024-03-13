import { renderPosts } from "../../pages/feed/functions/renderPosts.js";
import { selectOption } from "./filterOption.js";

export async function oldestFilter(posts) {
    document.getElementById('oldestOption').addEventListener('click', async function() {
        selectOption('Oldest');
        posts.data.sort((a, b) => new Date(a.created) - new Date(b.created));

        await renderPosts(posts);
    });
}
