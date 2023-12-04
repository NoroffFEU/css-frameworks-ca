import { API_BASE_URL } from "../routes.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "get";

/**
 * to get all posts
 * @returns
 */

export async function getPosts() {
    const getPostsurl = `${API_BASE_URL}${action}?_author=true`;
    const response = await authFetch(getPostsurl);
    return await response.json();

}

/**
 * to get a single post by id
 * @param {string} id
 * @returns
 */

export async function getPost(id) {
    if (!id) {
        throw error("this requires a postID");
    }
    const getPosturl = `${API_BASE_URL}${action}/${id}`;
    const response = await authFetch(getPosturl);

    return await response.json();
}