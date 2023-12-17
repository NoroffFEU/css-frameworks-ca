import { API_SOCIAL_URL } from "../api/constants.mjs";
import { authFetch } from "../api/authFetch.mjs";
import { displayError } from "../handlers/error.mjs";
import { deletePost } from "../handlers/deletePost.mjs";


export async function singlePost() {
  const resultById = document.querySelector("#post");
  if (!resultById) {
    console.error("Element with id 'post' not found.");
    return;
  }

  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  const singleUrl = API_SOCIAL_URL + "/posts/" + id + "?_author=true";
  
  try {
    const response = await authFetch(singleUrl);
    const singleResult = await response.json();
    
    function myOwnPosts() {
      let image = `<img
        src="../images/food-712665_640.jpg"
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
      resultById.innerHTML = `<div>
        <h4 class="text-center">${singleResult.title}</h4>
        ${image}
        <a href="/post/edit/index.html?id=${singleResult.id}" class="btn bg-warning mt-4"> Edit post </a>
        <button id="removePost" class="btn btn-outline-danger mt-4">Delete</button>
        </div>`;
    }
    myOwnPosts();
    deletePost(id);
  } catch (error) {

    resultById.innerHTML = displayError(
      "An error occurred when calling the API"
    );
  }
}

singlePost();