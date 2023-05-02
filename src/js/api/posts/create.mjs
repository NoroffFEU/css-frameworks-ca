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
        <div class="post-header">
          <img src="#" alt="User profile picture">
          <div class="post-header-text">
            <h2>${postData.title}</h2>
            <p>${postData.content}</p>
          </div>
        </div>
        <div class="post-content">
          <p>${newPost.content}</p>
          <img src="${newPost.image}" alt="${newPost.caption}">
        </div>
        <div class="post-footer">
          <button class="like-button">${newPost.likes} likes</button>
          <button class="comment-button">${newPost.comments} comments</button>
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
