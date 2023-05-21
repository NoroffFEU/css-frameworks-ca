import { getPosts } from "../api/posts/read.mjs";
import { postTemplate } from "../templates/post.mjs";

/**
 * @description this function listens to when the searchbutton is clicked
 * and calls the "getPosts" function to fetch posts based on the search parameters
 */

export function setSearchTagListener() {
  const searchInput = document.querySelector("#search-input");
  const activeInput = document.querySelector("#active-input");
  const searchBtn = document.querySelector("#search-button");
  const postContainer = document.querySelector("#post-container");

  searchBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const tag = searchInput.value;
      const active = activeInput.checked;
      console.log(searchInput.value);
      const posts = await getPosts(tag, active);

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
