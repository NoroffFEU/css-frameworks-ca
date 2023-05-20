import { getPosts } from "../api/posts/read.mjs";
import { postTemplate } from "../templates/post.mjs";

export function setSearchTagListener() {
  const searchInput = document.querySelector("#search-input");
  const searchBtn = document.querySelector("#search-button");
  const postContainer = document.querySelector("#post-container");

  searchBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const tag = searchInput.value;
      console.log(searchInput.value);
      const posts = await getPosts(tag);

      postContainer.innerHTML = "";
      posts.forEach((post) => {
        const postElement = postTemplate(post);
        postContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error(error);
    }
  });
}
