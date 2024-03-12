import { removePost } from "../api/posts/index.mjs";
import { getPost } from "../api/posts/index.mjs";

/**
 * Deleteing the post.
  
 */
export async function setRemovePostListener() {
    const form = document.querySelector("#deletePost");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (!id) {
        console.error('Invalid post ID:', id);
        return;
    }

    if (form) {
        try {
            const post = await getPost(id);
            fillFormWithData(form, post); 

            form.addEventListener("submit", async (event) => {
                event.preventDefault();

                try {
                    await removePost(id);
                    console.log('Post removed successfully');

                    alert('Post deleted successfully'); 

                    window.location.href = `/posts/index.html`; 
                } catch (error) {
                    console.error('Error removing post:', error);
                }
            });
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    }
}
function fillFormWithData(form, post) {
    form.title.value = post.title;
    form.body.value = post.body;
    form.media.value = post.media;
}