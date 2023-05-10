import { updatePost } from "../api/posts/index.mjs";

export function setUpdatePostFormListener() {
  const accessform = document.querySelector("#editPost");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  accessform.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());
    post.id = id;

    if (post.tags) {
      post.tags = post.tags.split(",").map((tag) => tag.trim());
    } else {
      post.tags = [];
    }

    updatePost(post);
  });
}
