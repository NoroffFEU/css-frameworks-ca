import { removePost } from "../api/posts/delete.mjs";

export function setDeletePostListener(deleteButton) {
    deleteButton.addEventListener("click", async () => {
        const postId = deleteButton.getAttribute("data-post-id");
        //user friendly confirmation popup. page reload on confirm to refresh feed
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (confirmed) {
            await removePost(postId);
            window.location.reload();
        }
    });
}
