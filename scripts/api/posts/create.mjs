import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * sends post request to api endpoint
 * @param {Object} postData - contains post data such as title, body, tags and media
 * @returns {Promise<Object>} - returns nothing
 */

const action = "/posts";
const method = "post";

export async function createPost(postData) {
    const createPostURL = API_SOCIAL_URL + action;

    const response = await authFetch(createPostURL, {
        method,
        body: JSON.stringify(postData)
    })

    return await response.json();
}