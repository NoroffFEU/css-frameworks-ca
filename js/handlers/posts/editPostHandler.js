import { getSingleProfilePost } from "../../api/posts/getSingleProfilePost.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { getParams } from "../../utils/helpers/getParams.js";
import { editPost } from "../../api/posts/editPost.js";

/**
 * Handles the editing of a post.
 *
 * This function is executed when the DOM is fully loaded. If the current URL path is not the edit post page, it returns immediately.
 *
 * It retrieves the post id from the URL parameters. If the id is not found, it throws an error.
 *
 * If the id is found, it retrieves the post data using the `getSingleProfilePost` function and fills the form with the post data.
 *
 * It also handles any errors during this process and displays an error message to the user.
 *
 * @throws {Error} If the post id is not found.
 */
export async function editPostHandler() {
  if (window.location.pathname !== "/profile/edit-post.html") {
    return;
  }

  const id = getParams("id");

  if (!id) {
    throw new Error("Sorry, we couldn't find the post you're looking for.");
  }

  if (id) {
    try {
      const post = await getSingleProfilePost(id);
      populateForm(post);
    } catch (error) {
      console.log(Error);
      messageForUser("#messageForUser", "danger", "sorry, we couldn't load editing form.");
    }
  }
}

document.addEventListener("DOMContentLoaded", editPostHandler);

/**
 * Populates the form with the post data.
 *
 * This function is called by `editPostHandler` when a post is successfully retrieved. It fills the form fields with the post data.
 *
 * @param {Object} post - The post data.
 */
function populateForm(post) {
  const form = document.querySelector("#editPostForm");
  form.id.value = post.id;
  document.getElementById("formTitle").value = post.title;
  document.getElementById("formMediaUrl").value = post.media;
  document.getElementById("newPost").value = post.body;
  form.addEventListener("submit", editPost);
}
