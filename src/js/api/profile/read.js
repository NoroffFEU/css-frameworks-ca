import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/profiles";
const method = "get";
const profileInfo = "?_posts=true&_author=true&_following=true&_followers=true";
const profile = JSON.parse(localStorage.getItem("profile"));


export async function getProfiles() {
    const updateProfileUrl = `${API_SOCIAL_URL}${action}`;

    const response = await authFetch(updateProfileUrl)
    return await response.json();

}



export async function getProfile(name) {
    if (!name) {
        throw new Error("Get requires a name");
    }
    const getProfileUrl = `${API_SOCIAL_URL}${action}/${name}${profileInfo}`;

    const response = await authFetch(getProfileUrl);
    return await response.json();
}
