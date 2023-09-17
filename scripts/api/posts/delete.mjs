import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * send delete request to api endpoint to remove post
 * @param {number} id - id of post to be removed
 * @returns {Promise<Object>} - return nothing, on failure will throw an error
 */

const action = "/posts";
const method = "delete";

export async function removePost(id) {
    if (!id) {
        throw new Error("Delete requires a postID");
    }
    const updatePostURL = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(updatePostURL, {
        method
    })

    return await response.json();
}