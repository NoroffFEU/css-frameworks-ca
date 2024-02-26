import { updatePost } from "../api/posts/index.mjs";

export function setUpdatePostListener() {
    document.addEventListener("DOMContentLoaded", () => {
        const editPostForm = document.querySelector("#editPostForm");

        if (editPostForm) {
            editPostForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                
                const formData = new FormData(editPostForm);
                const post = Object.fromEntries(formData.entries());

                // Send it to the API
                try {
                    const updatedPost = await updatePost(post);
                    console.log("Post updated:", updatedPost);
                } catch (error) {
                    console.error("Error updating post:", error);
                }
            });
        }
    });
}
