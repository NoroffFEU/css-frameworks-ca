import { API_SOCIAL_URL, API_POSTS } from "../constants.mjs"
import { authFetch } from "../authFetch.mjs";

/**
 * Removes a post from API
 * 
 * @param {string} id - The id of the post
 * @throws {Error} Throws an error if deleting the post fails or it's missing a postID
 * @returns {Promise} The deleted post result
 */

const method = "delete";

export async function removePost(id) {
    if (!id) {
        throw new Error("You have to have a postID to delete posts");
    } 
    const removePostUrl = `${API_SOCIAL_URL}${API_POSTS}/${id}`;
    const response = await authFetch(removePostUrl, {
        method
    });
    window.location.href = "/profile/myProfile/";
    return await response.json();
}   
