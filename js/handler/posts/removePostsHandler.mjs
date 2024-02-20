import { removePost } from "../../api/posts/index.mjs";

export async function removePostsHandler() {
  const removePostBtn = document.querySelectorAll(`[data-action="delete"]`);
  removePostBtn.forEach((button) => {
    button.addEventListener("click", handleDeletePost);
  });
}

async function handleDeletePost(event) {
  const id = event.target.dataset.id;
  await removePost(id);
  window.location.reload();

  const parentElement = event.target.parentElement;

  const confirmRemovePost = confirm(
    "Are you sure you want to delete this post?"
  );
  if (confirmRemovePost) {
    await deletePost(id);
    parentElement.remove();
    messageForUser("#modalDelete", "success", "Post deleted successfully");
  }
}
