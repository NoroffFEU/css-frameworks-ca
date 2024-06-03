import { authFetch } from "../authFetch.mjs";
import { API_POSTS, API_SOCIAL_URL } from "../constants.mjs";


const method = "post";

export async function postComments(postData, postId) {
    const commentUrl = `${API_SOCIAL_URL}${API_POSTS}/${postId}/comment`;
    try {
        const response = await authFetch(commentUrl, {
            method,
            body: JSON.stringify(postData),
        });

        if (response.ok) {
            window.location.href = "/feed/posts/";
            return await response.json();
        }
        if (!response.ok) {
            throw new Error("Creating comments failed");
        }
    } catch (error) {
        console.error(error)
    }
}