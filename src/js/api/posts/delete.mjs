import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "delete";

export async function deletePost(id) {
    if (!id) {
        throw new Error("Delete a post requires a postID");
    }
    const updatePostUrl = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(updatePostUrl, {
        method
    })
    // return await response.json();

    const post = await response.json();
    console.log("The post was deleted.");
}