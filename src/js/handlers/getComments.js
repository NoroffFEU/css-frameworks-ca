import { API_SOCIAL_URL } from "../api/constants.js";
import * as postMethods from "../api/posts/index.js";
import { authFetch } from "../api/authFetch.js";


//DESESTRUTURAR ESSA 
async function getComments() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    let id = params.get("id");
    const post = await postMethods.getPost(id);
    const comments = post.comments;
    const sortedComments = comments.sort((a, b) => a.id - b.id);
    const container = document.querySelector("#getComments");

    for (let i = 0; i < comments.length; i++) {
        const COMMENT_OWNER_URL = `${API_SOCIAL_URL}/profiles/${sortedComments[i].owner}?_posts=true&_author=true&_following=true&_followers=true`;
        const commenterData = await authFetch(COMMENT_OWNER_URL);

      
        container.innerHTML += `
          <div id="${sortedComments[i].id}" class="card d-flex flex-column p-3 mt-3">
              <a href="/profile/?name=${sortedComments[i].owner}" class="text-decoration-none">
                  <div class="d-flex align-items-center">
                      <div class="avatar p-1">
                      ${
                        commenterData.avatar
                          ? `<img src="${commenterData.avatar}" class="rounded-circle" height="50" alt="User Image" onerror="this.src='/images/user-icon-image-placeholder.jpg'">`
                          : `<img src="/images/user-icon-image-placeholder.jpg" alt="User Image" class="rounded-circle" height="50">`
                      }
                      </div>
                      <h4>${sortedComments[i].owner} says:</h4>
                  </div>
              </a>
              <div class="ms-5">
                  <p class="post-content">${sortedComments[i].body}</p>
              </div>
              <div class="d-flex justify-content-between">
                  <p class="post-content text-bg green-text ms-5">
                  </p>
              </div>
          </div>`;
      }

}
getComments();

