import { API_KEY, NN_BASE, NN_POSTS } from "../../constants.js";
import { load } from "../../storage/load.js";

export async function reactToPost(postId) {
    const response = await fetch(`${NN_BASE}${NN_POSTS}/${postId}/react/👍`, {
        headers: {
            Authorization: `Bearer ${load("token")}`,
            "X-Noroff-API-Key": API_KEY
        },
        method: "PUT"
    });

    if (response.ok) {
        const responseData = await response.json();
        return responseData;
    } else {
        throw new Error("Failed to react to post" + response.statusText);
    }
}