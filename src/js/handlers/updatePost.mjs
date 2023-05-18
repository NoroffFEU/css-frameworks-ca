import {getPost, updatePost } from "../api/posts/index.mjs";

export async function setUpdatePostListener() {
  const form = document.querySelector("#editPost");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (form) {
    const button = form.querySelector("button");
    button.disabled = true;

    const post = await getPost(id);
    
    form.title.value = post.title;
    form.body.value = post.body;
    form.tag.value = post.tag;
    form.media.value = post.media;

    button.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());
      console.log(post);
      post.id = id;
      console.log(post.id);

      //Send it to the API
      updatePost(post);
    });
  }
}
