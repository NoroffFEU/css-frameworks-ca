import { createPost } from "../../api/posts/index.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

/**
 * Attaches a submit event listener to the create post form.
 * When the form is submitted, it prevents the default form submission, extracts the form data, and attempts to create a post.
 * If the post creation is successful, it resets the form and displays a success message.
 * If the post creation fails, it displays an error message.
 */

export function createPostFormListener() {
  const form = document.querySelector("#createPost");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      post.tags = post.tags.split(",").map((tag) => tag.trim());
      console.log(post);

      try {
        await createPost(post);
        form.reset();
        displayMessage(
          "#message",
          "success",
          "You have successfully created a post."
        );
      } catch (error) {
        displayMessage("#message", "danger", "Please log in to create a post.");
      }
    });
  }
}
