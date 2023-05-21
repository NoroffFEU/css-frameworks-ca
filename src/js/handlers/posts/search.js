import * as templates from "../../ui/components/postTemplate.js";
import displayMessage from "../../ui/components/displayMessage.js";
import { loadPosts } from "../../storage/index.js";

export async function searchListener() {
  const button = document.querySelector("#searchBtn");
  if (button) {
    button.addEventListener("click", async () => {
      const posts = loadPosts();
      const input = document.querySelector("#searchInput");
      const search = input.value.trim().toLowerCase();
      const container = document.querySelector("#allPosts");
      container.innerHTML = '';
      if (search.length === 0) {
        templates.renderPostsTemplates(posts, container)
      }
      const postsFiltered = posts.filter(function (element) {
        return element?.title?.toLowerCase().includes(search);
      });
      templates.renderPostsTemplates(postsFiltered, container)
    });
  }
}
