import { createPost } from "../api/posts/index.mjs";

export function setCreatePostFormListener() {
    const form = document.querySelector("#createPostForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries())
      
            //Send to the API

            createPost(post);
    
        })
    }

};