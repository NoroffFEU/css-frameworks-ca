import * as postsMethods from "../api/posts/index.mjs";
import { displayError } from "./error.mjs";


export async function searchTeams() {
  const container = document.querySelector("#allPosts");
  try {
    const posts = await postsMethods.getPosts();
    const searchBar = document.querySelector(".searchBar");
    const searchBtn = document.querySelector(".searchBtn");
    searchBar.addEventListener("keyup", NameControlInput);
    function NameControlInput(event) {
      const inputValue = event.target.value.trim().toLowerCase();
      const filteredResult = posts.filter(({ title }) => {
        return title.toLowerCase().includes(inputValue);
      });

      container.innerHTML = "";

      filteredResult.forEach(function (filteredPosts) {
        if (filteredPosts.media) {
          image = `<img
            src="${filteredPosts.media}"
            class="card-img-top"
            alt="post image"
              />`;
        }
        container.innerHTML += `<div class="post">
            <h3>${filteredPosts.title}</h3>
            ${image}
            <a href="/post/index.html?id=${filteredPosts.id}" class="btn btn-outline-secondary"> View post </a>
          </div>
          `;
      });

      searchBtn.addEventListener('click', searchTeams);
      searchBar.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        searchTeams();
  }
});
    }
  } catch (error) {
    container.innerHTML += displayError(
      "An error occurred when calling the API"
    );
  }
}