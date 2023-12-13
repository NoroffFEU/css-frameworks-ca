import { fetchwithToken } from "./read.mjs";
import { searchAndsort } from "./filterAndSearch.mjs";

import { createNewPost } from "./create.mjs";
import { API_BASE_URL } from "../routes.mjs";

fetchwithToken (API_BASE_URL + '/posts');
searchAndsort ();

const createpost = document.getElementById('createpost');

createpost.addEventListener('submit', async function (event) {
    event.preventDefault();

    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;

    const accessToken = localStorage.getItem('accessToken');

    const newPost = await createNewPost(postTitle, postContent, accessToken);

    if (newPost) {
        const postscontainer = document.getElementsByClassName('postscontainer');
        const postElement = document.createElement('div');
        postElement.innerHTML =
            `<h3 class="content-font">${newPost.title}</h3>
            <p class="content-font">${newPost.body}</p>`;

            postscontainer.appendChild(postElement);

            document.getElementById('postTitle').value = '';
            document.getElementById('postContent').value = '';
    }
});

console.log(postscontainer);