import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

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
    if (response.status == 200) {
        window.location.href = "/posts/index.html";

    } else {
        const json = await response.json();
        alert(json.errors[0].message);
    }

        // return await response.json();-POR 
}