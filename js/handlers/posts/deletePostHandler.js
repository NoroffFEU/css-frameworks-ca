import { deletePost } from "../../api/posts/deletePost.js";
import { messageForUser } from "../../ui/messageForUser.js";

/**
 * Handles the delete post button click.
 *
 * When the delete post button is clicked, it confirms if the user wants to delete the post.
 * This function relies on buttons with a `data-action="delete"` attribute and expects a `data-id` attribute
 * specifying the post's ID to be present on the clicked element or its parent.
 * If the user confirms, it attempts to delete the post using its ID.
 * If the post is deleted successfully, it removes the post element from the DOM, displays a success message,
 * and redirects the user to the profile page after 3 seconds.
 * If the post fails to delete, it displays an error message to the user.
 */

export function deletePostHandler() {
  const deleteButtons = document.querySelectorAll(`[data-action="delete"]`);
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeletePost);
  });
}

async function handleDeletePost(event) {
  const { id } = event.target.dataset;

  const parentElement = event.target.parentElement;

  const shouldYouDelete = confirm("Are you sure you want to delete this post?");
  if (shouldYouDelete) {
    await deletePost(id);
    parentElement.remove();
    messageForUser("#post", "success", "Post deleted successfully");

    setTimeout(() => {
      window.location.href = "/profile/";
    }, 3000);
  }
}
