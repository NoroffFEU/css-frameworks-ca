import { updatePost } from "../api/posts/index.mjs";
import { getPost } from "../api/posts/index.mjs";

/**
 * Editing existing post data corresponding to the given ID
 */
export async function setUpdatePostListener() {
    const form = document.querySelector("#editPost");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        try {
            const post = await getPost(id);
            form.title.value = post.title;
            form.body.value = post.body;
            // form.tag.value = post.tag;
            form.media.value = post.media;

            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const formData = new FormData(form);
                const updatedPost = Object.fromEntries(formData.entries());
                updatedPost.id = id;

                try {
                    await updatePost(updatedPost);
                    console.log('Post updated successfully');

                    window.location.href = `/post/index.html?id=${id}`;
                } catch (error) {
                    console.error('Error updating post:', error);
                }
            });
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    }
}

function fillFormWithData(form, post) {
}