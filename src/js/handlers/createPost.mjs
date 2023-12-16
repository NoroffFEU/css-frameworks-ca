 /*import { createPost } from "../api/posts/index.mjs";

export function setCreatePostFormListener() {
  const form = document.querySelector("#createPost");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      // create post API
      const createdPost = await createPost(post);
      console.log("Created Post:", createdPost);
    });
  }
}
*/

import { createPost } from "../api/posts/create.mjs";

export function setCreatePostListener() {
    const form = document.querySelector("#createPost");
    
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      // Send it to the API
      createPost(post);
    });
  }
}
