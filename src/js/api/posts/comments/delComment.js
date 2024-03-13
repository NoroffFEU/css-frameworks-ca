import { API_KEY, NN_BASE, NN_POSTS } from "../../constants.js";
import { load } from "../../storage/load.js";

export async function delComment(postId, commentId) {
    const response = await fetch(`${NN_BASE}${NN_POSTS}/${postId}/comment/${commentId}`, {
        headers: {
            Authorization: `Bearer ${load("token")}`,
            "X-Noroff-API-Key": API_KEY
        },
        method: "DELETE"
    });

    if (response.ok) {
        alert("successfully deleted comment");
    } else {
        alert('Failed to delete comment! try again later or contact support!');
        throw new Error("Failed to delete comment!" + response.statusText);
    }
} 