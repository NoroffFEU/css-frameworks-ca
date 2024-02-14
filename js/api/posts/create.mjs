import { API_SOCIAL_URL } from "../api_constants.mjs";
import { getPosts } from "./getPost.mjs";

const action = "/posts";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form.validated');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const postTitle = document.querySelector("#exampleFormControlInput1").value;
        const postBody = document.querySelector("#validationTextarea").value;
        const postMedia = document.querySelector("#exampleFormControlInput2").value;

        try {
            const accessToken = localStorage.getItem("accessToken");
            const createPostUrl = API_SOCIAL_URL + action;

            const response = await fetch(createPostUrl, {
                method: 'POST', 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}` 
                },
                body: JSON.stringify({ title: postTitle, body: postBody, media: postMedia }) 
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const responseData = await response.json();
            form.reset(); 
            getPosts();
        } catch (error) {
            console.error('Error creating post:', error.message);
        }
    });
});










