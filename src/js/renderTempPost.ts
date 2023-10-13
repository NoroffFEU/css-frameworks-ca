import renderPosts from "./renderPost";

export default function renderTempPost(parentElement: HTMLDivElement, post) {
  const tempDiv = document.createElement("div");
  parentElement.prepend(tempDiv);
  renderPosts(tempDiv, post);
}
