import { removePost } from "../api/posts/index.mjs";

/**
   *Sets a listener for deleting a post.
   *@param {Event} event - The event object triggered by the user action.
   *@returns {Promise<void>} - A promise that resolves when the post is successfully deleted.
   *Prompts the user for confirmation before deleting the post.
   *@type {boolean}
   * Removes the post with the specified ID.
   * @param {string} id - The ID of the post to be removed.
   * @returns {Promise<void>} - A promise that resolves when the post is successfully removed.
   * Removes the parent element of the target element from the DOM.
   * @type {HTMLElement} - The parent element to be removed.
   */
export async function setDeletePostListener(event) {
  const { id } = event.target.dataset;
  const shouldDelete = confirm(
    "Are you sure you want to delete the post with id: " + id
  );

  if (shouldDelete) {
    await removePost(id);
    event.target.parent.remove();
  }
}
