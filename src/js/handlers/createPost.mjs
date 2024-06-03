import { createPost } from "../api/posts/index.mjs";

export function setCreatePostListener() {
    const form = document.querySelector("#createPost");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());
            
            if (post.tags) {
                const arrayOfTags = post.tags = post.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "").map(tag => `#${tag}`); 
                post.tags = arrayOfTags.length > 0 ? arrayOfTags : [];
            } else {
                post.tags = [];
            }
            createPost(post);
        })
        form.reset();
    }
}