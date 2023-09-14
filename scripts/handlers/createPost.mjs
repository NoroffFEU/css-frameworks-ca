import { createPost } from "../api/posts/index.mjs";

export function setCreatePostFormListener() {
  const form = document.querySelector("#createPost");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      post.tags = post.tags.split(",").map(tag => tag.trim());

      try {
        await createPost(post);
        
        window.location.href = '/posts/';
      } catch (error) {
        console.error("Error creating post:", error);
      }
    });
  }
}