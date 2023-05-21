import { createPost } from "../api/posts/index.mjs";

/**
  *Sets up the listener for the create post form submission.
*/
export function setCreatePostListener() {
  const form = document.querySelector("#createPost");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      console.log(form);
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      //Send it to the API
      createPost(post);
    });
  }
};
