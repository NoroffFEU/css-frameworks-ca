import { deletePost } from "../../api/posts/deletePost.js";
import { messageForUser } from "../../ui/messageForUser.js";

export function deletePostHandler() {
  const deleteButtons = document.querySelectorAll(`[data-action="delete"]`);
  console.log(deleteButtons);
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeletePost);
  });
}

async function handleDeletePost(event) {
  const { id } = event.target.dataset;
  console.log(id);

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
