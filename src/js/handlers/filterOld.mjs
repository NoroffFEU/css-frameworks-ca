import * as postsMethods from "../api/posts/index.mjs";
import { displayError } from "./error.mjs";
export async function oldPost() {
  const oldContainer = document.querySelector("#posts");
  const allPosts = await postsMethods.getPosts();
  const oldPosts = allPosts.sort((a, b) => {
    return a.id - b.id;
  });

  function filterOldPosts() {
    oldContainer.innerHTML = "";
    oldPosts.forEach(function (allOldPosts) {
      let image = `<img
        src="https://files.fm/thumb_show.php?i=ju48sg94r"
        class="card-img-top"
        alt="post image"
          />`;
      if (allOldPosts.media) {
        image = `<img
        src="${allOldPosts.media}"
        class="card-img-top"
        alt="post image"
          />`;
      }
      oldContainer.innerHTML += `
        <div class="post">
          <h3>${allOldPosts.title}</h3>
          ${image}
          <p>${allOldPosts.body}</p>
          <a href="/post/index.html?id=${allOldPosts.id}" class="btn btn-outline-secondary mb-4"> View post </a>
        </div>`;
    });
  }

  document.querySelector("#old").addEventListener("click", () => {
    filterOldPosts();
  });
}