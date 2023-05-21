import { getPost, updatePost } from "../api/posts/index.mjs";

export async function setUpdatePostFormListener() {
  const accessform = document.querySelector("#editPost");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (accessform) {
    const post = await getPost(id);
    const button = accessform.querySelector("button");
    button.disabled = true;

    accessform.title.value = post.title;
    accessform.body.value = post.body;
    accessform.tags.value = post.tags;
    accessform.media.value = post.media;

    button.disabled = false;

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
      window.location.href = "/posts/myPosts/index.html";
    });
  }
}
