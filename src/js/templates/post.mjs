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
          <button type="button" class="btn btn-light">Update post</button>
          <button type="button" class="btn btn-danger">Delete post</button>
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

export async function showContentOnPage() {
  const posts = await crud.getPosts();
  const container = document.querySelector("#post-container");
  renderPosts(posts, container);
}

export async function showCurrentUserPosts() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    console.log("error");
    return;
  }

  const posts = await crud.fetchPostsByUsername(currentUser.name);

  const container = document.querySelector("#userPostContainer");
  renderPosts(posts, container);
}
