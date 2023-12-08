
import { API_BASE_URL } from "../routes.mjs";
import { fetchwithToken } from "./index.mjs";

export async function createNewPost (postTitle, postContent, accessToken) {
    try {
        const postData = {
            title: postTitle,
            body: postContent,
        };

        if (!accessToken) {
            return;
        }

        const response = await fetch (`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify (postData),
        });

        if (response.ok) {
            const newPost = await response.json();
            alert (`New post added (ID ${newPost.id})`);
            return newPost;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

fetchwithToken(API_BASE_URL + '/posts');

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