import * as postsMethods from "../api/posts/index.mjs";
import { displayError } from "./error.mjs";


export async function searchTeams() {
  const container = document.querySelector("#allPosts");
  try {
    const posts = await postsMethods.getPosts();
    const searchBar = document.querySelector(".searchBar");
    searchBar.addEventListener("keyup", handelNameControlInput);
    function handelNameControlInput(event) {
      const inputValue = event.target.value.trim().toLowerCase();
      const filteredResult = posts.filter(({ title }) => {
        return title.toLowerCase().includes(inputValue);
      });

      container.innerHTML = "";

      filteredResult.forEach(function (filteredPosts) {
        let image = `<img
        src="../images/food-712665_640.jpg"
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
        container.innerHTML += `<div class="post">
            <h3>${filteredPosts.title}</h3>
            ${image}
            <a href="/post/index.html?id=${filteredPosts.id}" class="btn bg-warning mt-4"> View post </a>
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