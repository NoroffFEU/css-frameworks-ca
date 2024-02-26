import { createPost } from "../api/posts/index.mjs";

export function setCreatePostListener() {
  const form = document.querySelector("#newPostForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      //makes tags optional//
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
        .then((data) => {})
        .catch((error) => {
          console.error("Error creating post:", error);
        });
    });
  }
}
