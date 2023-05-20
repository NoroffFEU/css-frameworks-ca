import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";
import { getName } from "../../helpers/storage.js";

const action = "/profiles";
const method = "get";
const profileInfo = "?_posts=true&_author=true&_following=true&_followers=true";
const profile = JSON.parse(localStorage.getItem("profile"));



export async function getMyPosts() {
    // const username = profile.name;
    const username = getName();
    const endpoint = `/profiles/${username}`;
    const userPostsUrl = `${API_SOCIAL_URL}${endpoint}${action}${author}`;
    const response = await authFetch(userPostsUrl);

    return await response.json();
}


export async function getProfile(name) {
    if (!name) {
        name = getName();
    }
    const getProfileUrl = `${API_SOCIAL_URL}${action}/${name}${profileInfo}`;
    const response = await authFetch(getProfileUrl);
    return await response.json();
}
