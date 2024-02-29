import { createPost } from "../../api/posts/index.mjs";
import { showMessage } from "../../utils/messages.mjs";

export function setCreatePostListener() {
  const form = document.querySelector("#newPostForm");
  const modal = new bootstrap.Modal(document.getElementById("createPostModal"));
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      // Makes tags optional
      const tags = formData.has("tags")
        ? formData
            .get("tags")
            .split(",")
            .map((tag) => tag.trim())
        : undefined;
      if (tags) {
        post.tags = tags;
      }

      // Send it to the API
      createPost(post)
        .then((data) => {
          // Form is valid, close the modal
          modal.hide();
          showMessage("Post created successfully!", "success");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.error("Error creating post:", error);
          showMessage("Error creating post:", error);
        });
    });
  }
}
