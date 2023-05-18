import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "get";
const profile = JSON.parse(localStorage.getItem("profile"));
const author = "?_author=true&_comments=true&_reactions=true";

export async function getMyPosts() {
    const username = profile.name;
    const endpoint = `/profiles/${username}`;
    const userPostsUrl = `${API_SOCIAL_URL}${endpoint}${action}${author}`;
    const response = await authFetch(userPostsUrl)

    const json = await response.json();
 
    if (response.ok) {
        return json;

    } 
    throw new Error(json.errors[0].message);
}

export async function getPost(id) {
    if (!id) {
        throw new Error("Get requires a postID");
    }
    const getPostUrl = `${API_SOCIAL_URL}/posts/${id}?_author=true&_comments=true&_reactions=true`;

    const response = await authFetch(getPostUrl);
    const json = await response.json();
 
    if (response.ok) {
        return json;

    } 
    throw new Error(json.errors[0].message);
}

//GETS EVERYONES POSTS
// export async function getPosts() {
//     const updatePostUrl = `${API_SOCIAL_URL}${action}${author}`;

//     const response = await authFetch(updatePostUrl)

//     return await response.json();
// }

