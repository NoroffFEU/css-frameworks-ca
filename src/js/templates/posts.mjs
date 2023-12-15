import * as postsMethods from "../api/posts/index.mjs";
import { displayError } from "../handlers/error.mjs";

/**
 * this function Allows us to view posts from the api on html
 */
export async function postsTemplate() {
  const container = document.querySelector("#allPosts");
  try {
    const posts = await postsMethods.getPosts();

    container.innerHTML = "";

    posts.forEach(function (post) {
      let image = `<img
        src="../images/food-712665_640.jpg"
        class="card-img-top"
        alt="post image"
        />`;
      if (post.media) {
        image = `<img
          src="${post.media}"
          class="card-img-top"
          alt="post image"
        />`;
      }
      container.innerHTML += `
        <div class="post mb-5 border">
          <h4>${post.title}</h4>
          ${image}
          <a href="/post/index.html?id=${post.id}" class="btn btn-outline-secondary"> View post </a>
          <button id="removePost" class="btn btn-outline-secondary"> Remove </button>
        </div>
        `;
    });

  } catch (error) {
    container.innerHTML += displayError(
      "An error occurred when calling the API"
    );
  }
}