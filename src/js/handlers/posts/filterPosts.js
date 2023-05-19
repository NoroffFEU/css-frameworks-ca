import * as postMethods from "../../api/posts/index.js";
import * as templates from "../../ui/components/postTemplate.js";
import displayMessage from "../../ui/components/displayMessage.js";
import { savePosts } from "../../storage/index.js";
import { getPosts } from "./getPosts.js";

export async function filterListener() {
    const button = document.querySelector("#filterBtn");
    if (button) {
        button.addEventListener("click", async () => {
            const container = document.querySelector("#allPosts");

            const input = document.querySelector("#filterInput");
            const tag = input.value.trim();
            if (tag.length === 0) {
                container.innerHTML = '';
                getPosts();
                return;
            }
            try {
                const posts = await postMethods.filterMyPosts(tag);
                container.innerHTML = '';
                templates.renderPostsTemplates(posts, container)
                savePosts(posts)

            } catch (error) {
                displayMessage("danger", error, "#message");
            }
        });
    }
}

