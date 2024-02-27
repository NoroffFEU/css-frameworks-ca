import { updatePost } from "../api/posts/update.mjs";

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
                    const { title, body, media, id } = post;
                    const updatedPost = await updatePost(title, body, media, id); 
                  
                } catch (error) {
                    console.error("Error updating post:", error);
                }
            });
        }
    });
}
