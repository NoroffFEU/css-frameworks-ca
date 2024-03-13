import { updPost } from "../../../api/posts/updPost.js";

export async function editPost(newPost, postId) {
    newPost.querySelector('.edit-form').classList.remove('d-none');

    const editForm = newPost.querySelector('.edit-form');

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const postTitle = newPost.querySelector('.update-post-title').value;
            const postBody = newPost.querySelector('.update-post-body').value;
            
            await updPost(postId, postTitle, postBody);

            alert('Successfully updated the post!');

            window.location.reload();
        } catch (error) {
            console.error('Could not update the post at this point!' + error.message);
        }
    });
}
