import { delPost } from "../../../api/posts/delPost.js";

export async function deletePost(postId) {
    try {
        await delPost(postId);

        window.location.reload();
    } catch (error) {
        console.error('Could not delete post at this point!' + error.message);
    }
}