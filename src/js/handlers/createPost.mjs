import { createPost } from "../api/posts/index.mjs";
import * as postMethods from "../api/posts/index.mjs";

function setCreatePostFormListener() {
    const form = document.querySelector("#createPostForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries())
            
            //Send to the API

            createPost(post);
            console.log(post);

        })
    }

};

setCreatePostFormListener("submit", createPost)

postMethods.createPost();
// post.updatePost();
// post.removePost();
// post.getPost(5549).then(console.log);
// post.getPosts().then(console.log)

