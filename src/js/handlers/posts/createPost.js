import { createPost } from "../../api/posts/index.js";
import { createComment } from "../../api/posts/index.js";
import displayMessage from "../../ui/components/displayMessage.js";

export function setCreatePostFormListener() {
    const form = document.getElementById("createPostForm");
    if (form) {
        form.addEventListener("submit", async  (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());
            post.tags = post.tags.split(",");

            try {
                await  createPost(post);

			} catch (error) {
				displayMessage("danger", error, "#message");
			}
        })
    }
};


export function setCreateCommentFormListener() {
    const form = document.getElementById("createCommentForm");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const comment = Object.fromEntries(formData.entries());

            
            try {
                await  createComment(comment);

			} catch (error) {
				displayMessage("danger", error, "#message");
			}

        })
    }
};
