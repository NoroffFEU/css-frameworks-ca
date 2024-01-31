import { API_SOCIAL_URL } from "../api_constants.mjs";

const action = "/posts";

export async function createPost(postData) {
    const createPostUrl = API_SOCIAL_URL + action;
    
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(createPostUrl, {
        method: 'POST', // Assuming you're creating a new post
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}` // Use the retrieved access token
        },
        body: JSON.stringify(postData)
    });

    return await response.json();

}
