import { createPost, updatePost } from "../../api/posts/index.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

/**
 * Attaches a submit event listener to the edit post form.
 * When the form is submitted, it prevents the default form submission, extracts the form data, and attempts to update a post.
 * If the post update is successful, it displays a success message.
 * If the post update fails, it displays an error message.
 */

export function editPostFormListener() {
  const form = document.querySelector("#formEdit");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      post.tags = post.tags.split(",").map((tag) => tag.trim());

      try {
        await updatePost(post);
        displayMessage(
          "#message",
          "success",
          "You have successfully edited the post."
        );
      } catch (error) {
        console.log();
        displayMessage("#message", "danger", "Please log in to create a post.");
      }
    });
  }
}
