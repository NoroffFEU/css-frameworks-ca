import { API_SOCIAL_URL } from "../api_constants.mjs";
import { removePost } from "./deletePost.mjs";

/**
 * Represents the URL parameters extracted from the window location.
 * @type {URLSearchParams}
 */
const urlParams = new URLSearchParams(window.location.search);

/**
 * Represents the ID of the post obtained from the URL parameters.
 * @type {string}
 */
const postId = urlParams.get('id');

/**
 * Represents the access token obtained from the local storage.
 * @type {string}
 */
const accessToken = localStorage.getItem("accessToken");

/**
 * Fetches the details of a specific post from the social media API based on the provided post ID.
 * @param {string} postId The ID of the post to fetch.
 * @param {string} accessToken The access token used for authorization.
 * @returns {Promise} A promise that resolves once the post details are fetched and rendered.
 */
fetch(`${API_SOCIAL_URL}/posts/${postId}?_author=true`, {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})
    .then(response => response.json())
    .then(post => {
        const singlePageContainer = document.getElementById("single-page-container");
        const singlePageContent = document.createElement("div");
        singlePageContent.classList.add("card");
        singlePageContent.style.width = "23rem";
        singlePageContent.style.marginTop = "20px";
        singlePageContent.style.marginBottom = "20px";
        singlePageContent.classList.add("single-page-content");

        const mediaIMG = post.media ? `<img class="card-img-top" src="${post.media}" alt="Post media">` : '<img class="card-img-top" src="https://www.wellingmobilityscooters.co.uk/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default-large.jpg">';
        const avatarIMG = post.avatar ? `<img class="mx-auto d-block rounded-circle border border-custom-col height="60" src="${post.avatar}" alt="avatar profile">` : '<img class="mx-auto d-block rounded-circle" height="30" src="/images/ape-logo.png">';

        const date = new Date(post.created);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const newDate = `${day}.${month}.${year}`;

        singlePageContent.innerHTML = `
        ${mediaIMG}
        <div class="card-body">
            <div class="seperator">
                <div class="d-flex flex-column">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <div class="d-flex d-row gap-1 justify-content-left">
                        <p>${post._count.comments} Comments</p>
                        <p>${post._count.reactions} Reactions</p>
                    </div>
                    <p>${newDate}</p>
                    ${avatarIMG}
                </div>
                <p class="m-0 d-flex justify-content-center">${post.author && post.author.name}</p>
                <div class="d-flex justify-content-right py-3 gap-2">
                </div>
            </div>
        </div>`;

        singlePageContainer.appendChild(singlePageContent);
    })
    .catch(error => {
        console.error("Error fetching post:", error);
    });

