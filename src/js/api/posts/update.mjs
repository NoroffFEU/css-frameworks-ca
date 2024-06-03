import { API_SOCIAL_URL, API_POSTS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Updating a post 
 * 
 * @param {string} postData - The post data of the post
 * @param {string} postData.id - The id of the post
 * @throws {Error} Throws an error if the post dosen't update
 * @returns {Promise<Object>} The updated post data
 */

const method = "put";

export async function updatePost(postData) {
    if (!postData.id) {
        throw new Error("PostID is required to update posts");
    } 
    const updatePostUrl = `${API_SOCIAL_URL}${API_POSTS}/${postData.id}`;
    const response = await authFetch(updatePostUrl, {
        method,
        body: JSON.stringify(postData),  
    });
    window.location.href = "/profile/myProfile/";
    return await response.json();
}

