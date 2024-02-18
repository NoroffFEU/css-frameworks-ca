import { updatePost } from "./updatePost.js";
import { getParams } from "../../utils/helpers/getParams.js";
import { messageForUser } from "../../ui/messageForUser.js";

/**
 * Edits a post.
 *
 * It takes an event object, prevents the default form submission behavior, and retrieves the form data.
 * It then creates a post object from the form data and retrieves the post id from the URL parameters.
 * If the id is not found, it throws an error.
 * It then tries to update the post using the `updatePost` function.
 * If the update is successful, it hides the form, clears the h1 element, displays a success message, and redirects to the profile page after 3 seconds.
 * If the update fails, it displays an error message.
 *
 * @param {Event} event - The form submission event.
 * @throws {Error} If the post id is not found in the URL parameters.
 */

export async function editPost(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  let post = {};
  formData.forEach((value, key) => {
    post[key] = value;
  });

  const id = getParams("id");
  if (!id) {
    throw new Error("Sorry, we couldn't find the post you're looking for.");
  }

  console.log(post);
  try {
    await updatePost(post);
    document.querySelector("form#editPostForm").style.display = "none";
    document.querySelector("h1").innerHTML = "";
    messageForUser("#messageForUser", "success", "Post updated successfully.");

    setTimeout(() => {
      window.location.href = "/profile/";
    }, 3000);
  } catch (error) {
    console.log(error);
    messageForUser("#messageForUser", "danger", "Sorry, we couldn't update the post.");
  }
}
