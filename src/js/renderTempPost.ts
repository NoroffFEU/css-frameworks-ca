import renderPosts from "./renderPost.js";

export default function renderTempPost(parentElement: HTMLDivElement, post) {
  if (!post.author) {
    post = {
      ...post,
      author: {
        name: JSON.parse(localStorage.getItem("currentUser")),
        avatar: JSON.parse(localStorage.getItem("avatar")),
      },
    };
  }
  const tempDiv = document.createElement("div");
  parentElement.prepend(tempDiv);
  renderPosts(tempDiv, post);
}
