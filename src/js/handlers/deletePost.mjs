import * as crud from "../api/posts/index.mjs";

export function setDeleteButtonListeners() {
  const deleteButtons = document.querySelectorAll(".btn-danger");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const id = event.target.dataset.id;
      await crud.removePost(id);
      event.target.closest(".col").remove();
    });
  });
}
