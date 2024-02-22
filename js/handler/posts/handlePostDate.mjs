import { renderAllPosts } from "../../handler/posts/index.mjs";

export function handlePost(posts, selectedOption) {
  if (!Array.isArray(posts)) {
    console.error("TypeError: Expected 'posts' to be an array.");
    return;
  }

  let sortedPosts = [...posts];
  if (selectedOption === "newest") {
    sortedPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
  } else if (selectedOption === "oldest") {
    sortedPosts.sort((a, b) => new Date(a.created) - new Date(b.created));
  }
  renderAllPosts("#card", sortedPosts);
}
