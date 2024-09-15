import { renderPosts } from "./renderPosts.mjs";

export function searchPosts(newPosts) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    console.log(event);

    const seachValue = event.target.value.trim().toLowerCase();

    const filteredPosts = newPosts.filter(function (post) {
      if (post.name.toLowerCase().includes(seachValue)) {
        return true;
      }
    });

    renderPosts(filteredPosts);
  };
}
