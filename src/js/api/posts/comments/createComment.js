import { API_KEY, NN_BASE, NN_POSTS } from "../../constants.js";
import { load } from "../../storage/load.js";

export async function createComment(postId, commentBody) {
    try {
        const response = await fetch(`${NN_BASE}${NN_POSTS}/${postId}/comment`, {
            headers: {
                Authorization: `Bearer ${load("token")}`,
                "X-Noroff-API-Key": API_KEY,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({  body: commentBody })
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error("Failed to post the comment: " + response.statusText);
        }
    } catch (error) {
        throw new Error("Failed to post the comment: " + error.message);
    }
}
