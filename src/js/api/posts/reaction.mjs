import { authFetch } from "../authFetch.mjs";
import { API_POSTS, API_SOCIAL_URL } from "../constants.mjs";


const method = "PUT";
//const reaction = "👍";

export async function postReacts(reaction, postId) {
    const reactUrl = `${API_SOCIAL_URL}${API_POSTS}/${postId}/react/${reaction}`;
    try {
        const response = await authFetch(reactUrl, {
            method,
            body: JSON.stringify(reaction),
        });
        
        if (!response.ok) {
            throw new Error("Reaction failed");
        }

        return await response.json();
    } catch (error) {
        console.error("An error accured, failed at reacting to post", error)
    }
}