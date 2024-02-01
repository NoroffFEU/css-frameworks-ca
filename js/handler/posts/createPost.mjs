import { createPost } from "../../posts/index.mjs";

export function loginFormListener() {
  const form = document.querySelector("#createPost");

  if (form) {
    form.addEventListener ("submit", async (event) =>  {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      try {
        const response = await createPost(post);
        console.log(response); // Log the response
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
}