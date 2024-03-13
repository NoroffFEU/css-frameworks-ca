import { API_KEY, NN_BASE, NN_POSTS } from "../constants.js";
import { load } from "../storage/load.js";

export async function delPost(postId) {
    const response = await fetch(`${NN_BASE}${NN_POSTS}/${postId}`, {
        headers: {
            Authorization: `Bearer ${load("token")}`,
            "X-Noroff-API-Key": API_KEY
        },
        method: "DELETE"
    });

    if (response.ok) {
        alert("sucessfully deleted the post!");
    } else {
        alert("failed to delete post! Try again later or contact support.")
        throw new Error("Failed to delete the post!", + response.statusText);
    }

}