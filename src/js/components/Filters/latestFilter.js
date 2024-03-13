import { renderPosts } from "../../pages/feed/functions/renderPosts.js";
import { selectOption } from "./filterOption.js";

export async function latestFilter(posts) {
    document.getElementById('latestOption').addEventListener('click', async function() {
        selectOption('Latest');
        posts.data.sort((a, b) => new Date(b.created) - new Date(a.created));

        await renderPosts(posts);
    });
}
