import { API_BASE_URL } from "../routes.mjs";
import { authFetch } from "../authFetch.mjs";

const action = `/posts`;
const method = `delete`;

/**
 * this to delete post by id
 * @param {string} id
 * @returns
 */

export async function removePost(id) {
    if (!id) {
        throw error ("Deleting post requires postID");
    }
    const removePosturl = `${API_BASE_URL}${action}/${id}`;
    const response = await authFetch(removePosturl, {
        method,
    });
    alert("Your post has been deleted");
    window.location.replace("/post/index.html" || "/posts");
    return await response.json();
}