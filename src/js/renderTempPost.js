import renderPosts from "./renderPost";
export default function renderTempPost(parentElement, post) {
    const tempDiv = document.createElement("div");
    parentElement.prepend(tempDiv);
    renderPosts(tempDiv, post);
}
