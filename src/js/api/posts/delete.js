import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "delete";

export async function removePost(id) {
    if (!id) {
        throw new Error("Delete requires a postID");
    }
    const updatePostURL = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(updatePostURL, {
        method,
    });

    // const post = await response.json();
    // console.log(post);
    // return post

    return await response.json();
}
