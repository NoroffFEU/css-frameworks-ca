import { API_SOCIAL_URL } from "../api/constants.mjs";
import { authFetch } from "../api/authFetch.mjs";
import { displayError } from "../handlers/error.mjs";
import { deletePost } from "../handlers/deletePost.mjs";
/**
 * Allows us to view single post from the api by id
 */
export async function resultById() {
  const resultById = document.querySelector("#post");
  try {
    const accessToken = localStorage.getItem("profile");
    const myAuthor = JSON.parse(accessToken);
    const accurateAuthor = myAuthor.name;
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    const singleUrl = API_SOCIAL_URL + "/posts/" + id + "?_author=true";
    const response = await authFetch(singleUrl);
    const singleResult = await response.json();

    /**
     * This function works when this condition (singleResult.author.name === accurateAuthor) is met
     */
    function myOwnPosts() {
      let image = `<img
        src="https://files.fm/thumb_show.php?i=ju48sg94r"
        class="card-img-top"
        alt="post image"
        />`;
      if (singleResult.media) {
        image = `<img
          src="${singleResult.media}"
          class="card-img-top"
          alt="post image"
          />`;
      }
      resultById.innerHTML += `<div>
        <h3>${singleResult.author.name}</h3>
        <h4>${singleResult.title}</h4>
        ${image}
        <p>${singleResult.body}</p>
        <button id="removePost" class="btn btn-outline-danger">Delete</button>
        <a href="/post/edit/index.html?id=${singleResult.id}" class="btn btn-outline-secondary"> Edit post </a>
        </div>`;
    }

    /**
     * This function works when this condition (singleResult.author.name === accurateAuthor) is not fulfilled.
     */

    function othersPosts() {
      let image = `<img
        src="https://files.fm/thumb_show.php?i=ju48sg94r"
        class="card-img-top"
        alt="post image"
        />`;
      if (singleResult.media) {
        image = `<img
          src="${singleResult.media}"
          class="card-img-top"
          alt="post image"
          />`;
      }
      resultById.innerHTML += `<div>
        <h3>${singleResult.author.name}</h3>
        <h4>${singleResult.title}</h4>
        ${image}
        <p>${singleResult.body}</p>
        </div>`;
    }

    if (singleResult.author.name === accurateAuthor) {
      myOwnPosts();

      deletePost(id);
    } else {
      othersPosts();
    }
  } catch (error) {
    resultById.innerHTML += displayError(
      "An error occurred when calling the API"
    );
  }
}