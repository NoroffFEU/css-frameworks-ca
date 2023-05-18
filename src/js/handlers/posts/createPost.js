import { createPost } from "../../api/posts/index.js";
import { createComment } from "../../api/posts/index.js";

export function setCreatePostFormListener() {
    const form = document.getElementById("createPostForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());

            createPost(post);
        })
    }
};


function setCreateCommentFormListener() {
    const form = document.getElementById("createCommentForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const comment = Object.fromEntries(formData.entries());

            createComment(comment);
        })
    }
};
setCreateCommentFormListener()