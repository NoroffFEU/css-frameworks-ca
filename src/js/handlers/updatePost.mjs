import { getPost, updatePost } from "../api/posts/index.mjs";
/**
 * this function handler our update function
 */
export async function setUpdatePostFormListener() {
  const form = document.querySelector("#editPost");
    
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (form) {
    const post = await getPost(id);
      
    form.title.value = post.title;
    form.body.value = post.body;
    form.tags.value = post.tags;
    form.media.value = post.media;
    
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());
      post.id = id;
        
      // login API
      updatePost(post);
    });
  }
}