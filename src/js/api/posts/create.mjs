import { HOST_API_URL, POSTS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function createPost(postData) {
  const createPostURL = HOST_API_URL + POSTS;

  const response = await authFetch(createPostURL, {
    method: "POST",
    body: JSON.stringify(postData),
  });
  return await response.json();
}

export async function renderPostToHtml(event) {
  event.preventDefault();
  // prevent the form from submitting via HTTP

  const formData = new FormData(event.target);
  const postData = Object.fromEntries(formData.entries()); // convert form data to object

  try {
    const newPost = await createPost(postData);

    // add the new post to the page
    const postContainer = document.getElementById("post-container");
    console.log(postContainer);
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 pt-4">
    <div class="col">
      <div class="card shadow-sm">
        <img src="/src/scss/images/cat-gd507bc786_640.jpg" alt="Cat relaxing on blanket">
        <div class="card-body">
          <p class="card-text">${postData.title}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-primary">Like</button>
              <button type="button" class="btn btn-sm btn-outline-primary">Comment</button>
            </div>
            <small class="text-body-secondary"></small>
          </div>
        </div>
      </div>
    </div>
      `;
    postContainer.appendChild(postElement);
  } catch (error) {
    console.error("Error creating post:", error);
    // handle the error, such as displaying an error message on the page
  }
}

const form = document.getElementById("create-post-form");
form.addEventListener("submit", renderPostToHtml);
