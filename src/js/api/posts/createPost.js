import { renderPosts } from "../../pages/feed/functions/renderPosts.js";
import { API_KEY, NN_BASE, NN_POSTS } from "../constants.js";
import { load } from "../storage/load.js";

export async function createPost(postTitle, postBody) {
    try {
        const response = await fetch(NN_BASE + NN_POSTS, {
            headers: {
                Authorization: `Bearer ${load("token")}`,
                "X-Noroff-API-Key": API_KEY,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ title: postTitle, body: postBody })
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error("Failed to create the post: " + response.statusText);
        }
    } catch (error) {
        throw new Error("Failed to create the post: " + error.message);
    }
}
