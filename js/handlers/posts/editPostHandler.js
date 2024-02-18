import { getSinglePost } from "../../api/posts/getSinglePost.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { getParams } from "../../utils/helpers/getParams.js";
import { editPost } from "../../api/posts/editPost.js";

/**
 * Handles the post editing process.
 *
 * It retrieves the post id from the URL parameters. If the id is not found and the current URL path is the edit post page, it throws an error.
 * If the id is found, it retrieves the post data using the `getSinglePost` function and fills the form with the post data.
 * It also adds an event listener to the form to handle the form submission using the `editPost` function.
 * If there's an error during this process, it displays an error message to the user.
 *
 * @throws {Error} If the post id is not found and the current URL path is the edit post page.
 */

export async function editPostHandler() {
  const id = getParams("id");

  if (window.location.pathname === "/profile/edit-post.html" && !id) {
    throw new Error("Sorry, we couldn't find the post you're looking for.");
  }

  if (id) {
    try {
      const post = await getSinglePost(id);
      populateForm(post);
    } catch (error) {
      console.log(Error);
      messageForUser("#messageForUser", "danger", "sorry, we couldn't load editing form.");
    }
  }
}

document.addEventListener("DOMContentLoaded", editPostHandler);

function populateForm(post) {
  const form = document.querySelector("#editPostForm");
  form.id.value = post.id;
  document.getElementById("formTitle").value = post.title;
  document.getElementById("formMediaUrl").value = post.media;
  document.getElementById("newPost").value = post.body;
  form.addEventListener("submit", editPost);
}
