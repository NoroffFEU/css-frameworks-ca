import { removePost } from "../../api/posts/index.mjs";

/**
 * Attaches a click event listener to each delete post button.
 * When a button is clicked, it calls the `handleDeletePost` function.
 */

export async function removePostsHandler() {
  const removePostBtns = document.querySelectorAll(`[data-action="delete"]`);
  removePostBtns.forEach((button) => {
    button.addEventListener("click", handleDeletePost);
  });
}

/**
 * Handles the delete post button click event.
 * It prevents the default button click behavior, gets the post ID from the button's data attributes, and asks the user to confirm the post deletion.
 * If the user confirms, it deletes the post, removes the post's card from the DOM, and redirects to the profile page after 5 seconds.
 *
 * @param {Event} event - The button click event.
 * @returns {Promise<void>} Nothing.
 */

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
