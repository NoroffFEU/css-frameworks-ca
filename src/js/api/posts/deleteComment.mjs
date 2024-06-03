import { authFetch } from "../authFetch.mjs";
import { API_POSTS, API_SOCIAL_URL } from "../constants.mjs";

/**
 * Removes a comment from post
 * 
 * @param {string} commentId - The id of the comment
 * @param {string} postId - The id of the post
 * @throws {Error} Throws an error if deleting the comment fails
 * @returns {Promise} The deleted comment result
 */

const method = "DELETE";

export async function removeComments(commentId, postId) { 
    if (!commentId) {
        throw new Error("Deleting comment failed");
    }
    const reemoveCommentUrl = `${API_SOCIAL_URL}${API_POSTS}/${postId}/comment/${commentId}`;
    const response = await authFetch(reemoveCommentUrl, {
        method,
    });
    window.location.href = "/feed/posts/";
    return;
}