import { renderAllPosts } from "../../templates/index.mjs";

export function handlePostDate(posts, selectedOption) {
  if (!Array.isArray(posts)) {
    console.error("TypeError: Expected 'posts' to be an array.");
    return;
  }

  let sortedPosts = [...posts];
  if (selectedOption === "newest") {
    console.log("Before sorting:", sortedPosts);
    sortedPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
    console.log("After sorting:", sortedPosts);
  } else if (selectedOption === "oldest") {
    console.log("Before sorting:", sortedPosts);
    sortedPosts.sort((a, b) => new Date(a.created) - new Date(b.created));
    console.log("After sorting:", sortedPosts);
  }
  renderAllPosts("#card", sortedPosts);
}
