import { API_SOCIAL_URL } from "../constants.js";

import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "put";

export async function updatePost(postData) {
    if (!postData.id) {
        throw new Error("Post update requires a postID");
    }
    const updatePostUrl = `${API_SOCIAL_URL}${action}/${postData.id}`;

    const response = await authFetch(updatePostUrl, {
        method,
        body: JSON.stringify(postData)
    });
    if (response.ok) {


    } else {
        const json = await response.json();
        throw new Error(json.errors[0].message);
    }

}