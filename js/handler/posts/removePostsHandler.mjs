import { removePost } from "../../api/posts/index.mjs";

export async function removePostsHandler() {
  const removePostBtns = document.querySelectorAll(`[data-action="delete"]`);
  removePostBtns.forEach((button) => {
    button.addEventListener("click", handleDeletePost);
  });
}

async function handleDeletePost(event) {
  event.preventDefault();

  const { id } = event.target.dataset;
  const parentElement = event.target.closest(".card");

  const confirmRemovePost = confirm(
    "Are you sure you want to delete this post?"
  );

  if (confirmRemovePost) {
    await removePost(id);
    parentElement.remove();

    setTimeout(() => {
      window.location.href = "/profile/";
    }, 5000);
  }
}
