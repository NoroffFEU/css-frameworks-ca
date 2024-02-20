import { API_SOCIAL_URL } from "../api_constants.mjs";
import { getPosts } from "./getPost.mjs";

const action = "/posts";

/**
 * A form with an eventlistener that sends a request to the API after the user has inputed a title, description and an image (optional).
 * Uses async fetch and sends stringified data of title, body and media. Will throw an error if there's an error in creation of the post.
 * If post is successfully created, it calls on the getPost() function to reload and display all posts.
 * @param {Event} e Submit event object.
 * @throws {error} Throws an error if there's an issue with creating post.
 */

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










