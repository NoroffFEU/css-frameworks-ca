import * as postsMethods from "../api/posts/index.mjs";
import { displayError } from "./error.mjs";
/**
 * this function allows us to search by title
 */
export async function searchFunction() {
  const container = document.querySelector("#posts");
  try {
    const posts = await postsMethods.getPosts();
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("keyup", handelNameControlInput);
    function handelNameControlInput(event) {
      const inputValue = event.currentTarget.value.toLowerCase();
      const filteredResult = posts.filter(({ title }) => {
        return title.toLowerCase().includes(inputValue);
      });

      container.innerHTML = "";

      filteredResult.forEach(function (filteredPosts) {
        let image = `<img
          src="https://files.fm/thumb_show.php?i=ju48sg94r"
          class="card-img-top"
          alt="post image"
          />`;
        if (filteredPosts.media) {
          image = `<img
            src="${filteredPosts.media}"
            class="card-img-top"
            alt="post image"
              />`;
        }
        container.innerHTML += `
          <div class="post">
            <h3>${filteredPosts.title}</h3>
            <p>${filteredPosts.body}</p>
            ${image}
            <a href="/post/index.html?id=${filteredPosts.id}" class="btn btn-outline-secondary"> View post </a>
            
          </div>
          
          `;
      });
    }
  } catch (error) {
    container.innerHTML += displayError(
      "An error occurred when calling the API"
    );
  }
}