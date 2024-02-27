import { updatePost } from "../api/posts/update.mjs";
import {
  storeScrollPosition,
  restoreScrollPosition,
} from "../utils/scrollePosition.mjs";

export function modalEditPost() {
  const editPostForm = document.querySelector("#editPostForm");
  const editPostModal = new bootstrap.Modal(
    document.getElementById("editPostModal")
  );

  editPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(editPostForm);
    const post = Object.fromEntries(formData.entries());
    try {
      const { title, body, media, id } = post;

      if (!id) {
        throw new Error("Update requires a postID");
      }

      await updatePost(title, body, media, id);

      editPostModal.hide();

      storeScrollPosition();
      // Reload the page to reflect the updated post
      window.location.reload(true);
    } catch (error) {
      console.error("Error updating post:", error);
      editPostModal.hide();
    }
  });
  setTimeout(() => {
    restoreScrollPosition();
  }, 1000);
}