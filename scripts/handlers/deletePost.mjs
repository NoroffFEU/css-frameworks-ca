import { removePost } from "../api/posts/delete.mjs";

export function setDeletePostListener(deleteButton) {
    deleteButton.addEventListener("click", async () => {
        const postId = deleteButton.getAttribute("data-post-id");

        // show a confirmation dialog before deleting
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (confirmed) {
            await removePost(postId);
            window.location.reload();
        }
    });
}
