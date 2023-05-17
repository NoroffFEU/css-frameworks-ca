import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";
import { load } from "../../storage/index.js";

const action = "/posts";
const method = "get";
const profile = JSON.parse(localStorage.getItem("profile"));
console.log(profile.name);
const author = "?_author=true&_comments=true&_reactions=true";
const url = "https://api.noroff.dev/api/v1/social/profiles/Emilytest5/posts";

export async function getMyPosts() {
    const username = profile.name;
    const endpoint = `/profiles/${username}`;
    const userPostsUrl = `${API_SOCIAL_URL}${endpoint}${action}${author}`;
    const response = await authFetch(userPostsUrl)

    return await response.json();
}

//GETS ALL POSTS
// export async function getPosts() {
//     const updatePostUrl = `${API_SOCIAL_URL}${action}${author}`;

//     const response = await authFetch(updatePostUrl)

//     return await response.json();
// }

export async function getPost(id) {
    if (!id) {
        throw new Error("Get requires a postID");
    }
    const getPostUrl = `${API_SOCIAL_URL}/posts/${id}?_author=true&_comments=true&_reactions=true`;

    const response = await authFetch(getPostUrl);
    return await response.json();

}

