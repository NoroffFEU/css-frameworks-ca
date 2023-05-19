import * as crud from "../api/posts/index.mjs";

import { getCurrentUser } from "../storage/index.mjs";

export function postTemplate(postData) {
  const post = document.createElement("div");
  post.classList.add("posts");
  post.innerHTML = postData.title;

  const imageSrc = postData.media || "../../../images/placeholder-image.png";

  const postHTML = `
    <div class="col">
      <div class="card shadow-sm">
        <img src="${imageSrc}" 
             alt="${
               postData.media
                 ? `This image is from ${postData.title}`
                 : "Placeholder image"
             }" 
          style="max-width: 420px; max-height: 300px; object-fit: cover;">
        <div class="card-body">
          <h3 class="card-text">${postData.title}</h3>
          <p class="card-text">${postData.body}</p>
          <div class="d-flex justify-content-between align-items-center">
          <a href="/post/edit/index.html?id=${
            postData.id
          }" class="btn btn-light">Update post</a>
          <a href="/post/postById/index.html?id=${
            postData.id
          }" class="btn btn-primary" id="view-post">View Post</a>
          <button type="button" class="btn btn-danger" data-id="${
            postData.id
          }">Delete post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = postHTML.trim();
  return tempDiv.firstChild;
}

export function createNewPost(postData, parent) {
  parent.prepend(postTemplate(postData));
}

export function renderPosts(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}

// Showes contet on the feed page without displaying the Update and Delete buttons

export async function showContentOnPage() {
  const posts = await crud.getPosts();
  const container = document.querySelector("#post-container");
  renderPosts(posts, container);

  if (window.location.pathname === "/posts/index.html") {
    const buttons = document.querySelectorAll(".btn-light, .btn-danger");
    buttons.forEach((button) => {
      button.style.display = "none";
    });
  }
}

//displays only the posts of the logged in user - identification by username

export async function showCurrentUserPosts() {
  return new Promise(async (resolve, reject) => {
    try {
      const currentUser = getCurrentUser();

      if (!currentUser) {
        console.log("error");
        return;
      }

      const posts = await crud.fetchPostsByUsername(currentUser.name);

      const container = document.querySelector("#userPostContainer");
      renderPosts(posts, container);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
