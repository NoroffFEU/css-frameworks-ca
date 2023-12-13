import { createPost } from "../api/posts/index.mjs";
/**
 * this function handler our createPost function
 */
export function setCreatePostFormListener() {
  const form = document.querySelector("#createPost");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      // create post API
      createPost(post);
    });
  }
}