
import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";

/**
 * Updates a post by sending a request to the social API server.
 **/

export async function updatePost(postData) {
    if (!postData.id) {
        throw new Error("Update requires a postId");
    }
    const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`; 

    const response = await authFetch(updatePostURL, {
        method,
        body: JSON.stringify(postData)
    })

    return await response.json();

}