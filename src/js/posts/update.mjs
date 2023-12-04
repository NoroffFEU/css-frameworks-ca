import { API_BASE_URL } from "../routes.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";

/**
 * this for updating posts  by id
 * @param {string} postData
 * @returns
 */

export async function updatePost(postData) {
    if(!postData.id) {
        throw error ("update requires a postID");
    }
    postData.tags = postData.tags.split(" ");
    const updatePosturl = `${API_BASE_URL}${action}/${postData.id}`;
    const response = await authFetch(updatePosturl, {
        method,
        body: JSON.stringify(postData),
    });
    alert("Your post was updated");
    window.location.replace("/post/index.html");
    return await response.json();
}
