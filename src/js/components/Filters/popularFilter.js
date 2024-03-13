import { renderPosts } from "../../pages/feed/functions/renderPosts.js";
import { selectOption } from "./filterOption.js";

export async function popularFilter(posts) {
    document.getElementById('popularOption').addEventListener('click', async function() {
        selectOption('Popular');
        posts.data.sort((a, b) => b._count.reactions - a._count.reactions);


        await renderPosts(posts);
    });
}
