import { API_SOCIAL_URL } from "../api/constants.mjs";
import { authFetch } from "../api/authFetch.mjs";
import { displayError } from "../handlers/error.mjs";
import { deletePost } from "../handlers/deletePost.mjs";
/**
 * Allows us to view single post from the api by id
 */
export async function resultById() {
  try {
    const resultById = document.querySelector("#post");
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    const singelUrl = API_SOCIAL_URL + "/posts/" + id + "?_author=true";
    const response = await authFetch(singelUrl);
    const singelResult = await response.json();

  
    function myOwnPosts() {
      let image = `<img
        src="../images/food-712665_640.jpg"
        class="card-img-top"
        alt="post image"
        />`;
      if (singelResult.media) {
        image = `<img
          src="${singelResult.media}"
          class="card-img-top"
          alt="post image"
          />`;
      }
      resultById.innerHTML += `<div>
        <h4>${singelResult.title}</h4>
        ${image}
        <button id="removePost" class="btn btn-outline-danger">Delete</button>
        <a href="/post/edit/index.html?id=${singelResult.id}" class="btn btn-outline-secondary"> Edit post </a>
        </div>`;
    }

    myOwnPosts();

    deletePost(id);
  
    
  } catch (error) {
    resultById.innerHTML += displayError(
      "An error occurred when calling the API"
    );
  }
}
    
      

