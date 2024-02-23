import { getPost } from "../../api/posts/getPost.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";
import { editPostFormListener } from "./editPostFormListener.mjs";

/**
 * Handles the edit form.
 * It gets the post ID from the query string, fetches the post data, populates the form with the post data, and attaches a submit event listener to the form.
 * If the post ID is not present in the query string, it redirects to the home page.
 * If an error occurs during this process, it logs the error and displays an error message.
 */

export async function handleEditForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    location.href = "/";
  }

  try {
    const post = await getPost(id);
    populateForm(post);
    editPostFormListener();
  } catch (error) {
    console.error(error);
    displayMessage("#message", "danger", "Please log in to edit a post.");
  }
}

/**
 * Populates the edit form with the post data.
 *
 * @param {Object} post - The post data.
 */

function populateForm(post) {
  const { title, body, tags, id } = post;

  const form = document.querySelector("#formEdit");
  form.id.value = id;
  form.title.value = title;
  form.body.value = body;
  form.tags.value = tags.join(", ");
}
