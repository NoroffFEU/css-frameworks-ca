import { getPost } from "../api/posts/read.mjs";

export function displayPostByIdListener() {
  const PostButton = document.querySelector("#view-post");
  PostButton.addEventListener("click", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    const postData = await getPost(postId);

    const container = document.querySelector("#postId-container");
    const postElement = postTemplate(postData);

    container.appendChild(postElement);

    PostButton.disabled = true;
  });
}
