import { createPost } from "../api/posts/index.mjs";

/**
 * @description
 * This function sets up an event listener for form submission on the #createPost form.
 * Upon form submission, it gathers the data from the form, creates a post through the createPost API,
 * and then redirects the user to the same page the user came from or the /post/index.html by default
 *
 * @returns {void}
 */

export function setCreatePostFormListener() {
  const accessform = document.querySelector("#createPost");
  const urlParams = new URLSearchParams(window.location.search);
  const redirectURL = urlParams.get("redirect") || "/posts/index.html";

  accessform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());

    if (post.tags) {
      post.tags = post.tags.split(",").map((tag) => tag.trim());
    } else {
      post.tags = [];
    }
    try {
      await createPost(post);
      window.location.href = redirectURL;
    } catch (error) {
      console.log("an error aoccured while creating the post", error);
    }
  });
}
