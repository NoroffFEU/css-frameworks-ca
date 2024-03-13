import { API_KEY, NN_BASE, NN_POSTS } from "../constants.js";
import { load } from "../storage/load.js";

export async function updPost(postId, postTitle, postBody) {
    const response = await fetch(`${NN_BASE}${NN_POSTS}/${postId}`, {
        headers: {
            Authorization: `Bearer ${load("token")}`,
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({ title: postTitle, body: postBody })
    });

    if (response.ok) {
        const responseData = await response.json();
        return responseData;
    } else {
        throw new Error("Failed to update post: " + response.statusText);
    }
}
