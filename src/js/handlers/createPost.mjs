import { createPost } from "../api/posts/index.mjs";

export function setCreatePostFormListener() {
  const accessform = document.querySelector("#createPost");

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
      location.href = "/posts/index.html";
    } catch (error) {
      console.log("an error aoccured while creating the post", error);
    }
  });
}
