import { API_SOCIAL_URL } from "../../api/constants.js";
import * as postMethods from "../../api/posts/index.js";
import { authFetch } from "../../api/authFetch.js";
import displayMessage from "../../ui/components/displayMessage.js";


//DESESTRUTURAR ESSA 
export async function getComments() {
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

      try {
        container.innerHTML += `
        <div id="${sortedComments[i].id}" class="card d-flex flex-column p-3 mt-3">
           
                <div class="d-flex align-items-center">
                    <div class="avatar p-1">
                    ${
                      sortedComments[i].author.avatar
                        ? `<img src="${sortedComments[i].author.avatar}" class="rounded-circle" height="50" width="50" alt="${sortedComments[i].owner}" onerror="this.src='/images/user-icon-image-placeholder.jpg'">`
                        : `<img src="/images/user-icon-image-placeholder.jpg" alt="${sortedComments[i].owner}" class="rounded-circle" height="50" width="50">`
                    }
                    </div>
                    <h4>${sortedComments[i].owner} says:</h4>
                </div>
          
            <div class="ms-5">
                <p class="post-content">${sortedComments[i].body}</p>
            </div>

        </div>`;
      } catch (error) {
        displayMessage("danger", error, "#message");
      }

      }

}


