import { API_ALL_POSTS } from "../common/constant.mjs";
import { API_CREATE_POST } from "../common/constant.mjs";
import { getPosts } from "./fetch-posts.mjs";

const postButton = document.querySelector("#post-button");

postButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("postTitle");
    const bodyInput = document.getElementById("postContent");

    const title = titleInput.value;
    const body = bodyInput.value;

    await createNewPost(title, body);

    titleInput.value = "";
    bodyInput.value = "";
});


async function createNewPost(title, body, tags, media) {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.log('Access token is missing. Redirect to the login page.');
            return;
        }

        const postData = {
            title: title,
            body: body,
        };

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        };

        const response = await fetch(API_CREATE_POST, postOptions);

        if (response.ok) {
            getPosts(API_ALL_POSTS);
        } else {
            console.log('Error response:', response.status, await response.json());
        }
    } catch (error) {
        console.error(error);
    }
}
