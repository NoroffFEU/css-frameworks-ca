import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "get";
const author = "?_author=true&_comments=true&_reactions=true";
const numberOfPosts = "?limit=10&offset=0"

export async function getPosts() {
    const updatePostUrl = `${API_SOCIAL_URL}${action}${author}`;

    const response = await authFetch(updatePostUrl)

    return await response.json();
}

export async function getPost(id) {
    if (!id) {
        throw new Error("Get requires a postID");
    }
    const getPostUrl = `${API_SOCIAL_URL}/posts/${id}?_author=true&_comments=true&_reactions=true`;

    const response = await authFetch(getPostUrl);
    return await response.json();

}

