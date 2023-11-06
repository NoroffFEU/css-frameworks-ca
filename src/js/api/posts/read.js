import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "get"; //do not have to write this

export async function getPosts() {
    const getPostURL = `${API_SOCIAL_URL}${action}?_author=true`;

    const response = await authFetch(getPostURL);

    // console.log(await response.json());
    return await response.json();
}

export async function getPost(id) {
    if (!id) {
        throw new Error("Get requires a postID");
    }
    const getPostURL = `${API_SOCIAL_URL}${action}/${id}?_author=true`;

    const response = await authFetch(getPostURL);

    // console.log(await response.json());
    return await response.json();
}
