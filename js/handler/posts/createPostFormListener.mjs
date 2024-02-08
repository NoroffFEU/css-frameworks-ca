import { createPost } from "../../api/posts/index.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

export function createPostFormListener() {
  const form = document.querySelector("#createPost");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      post.tags = post.tags.split(",").map((tag) => tag.trim());

      try {
        await createPost(post);
        form.reset();
        displayMessage(
          "#message",
          "success",
          'You have successfully created a post. <a href="/">View your post.</a>'
        );
      } catch (error) {
        displayMessage("#message", "danger", error.message);
      }
    });
  }
}
