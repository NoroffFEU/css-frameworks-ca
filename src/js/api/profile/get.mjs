import { load } from "../../storage/index.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

// const method = "get";
const profile = "/profiles";
const action = "?_author=true&_reactions=true&_comments=true";
const posts = "?_posts=true";

export async function getProfiles() {
    const getProfilesUrl = `${API_SOCIAL_URL}${profile}`;
    const response = await authFetch(getProfilesUrl);
    return await response.json();
}

export async function getMyProfile(name = load("profile").name) { 
    if (!name) {
        throw new Error("Requires a name");
    } 
    const getMyProfileUrl = `${API_SOCIAL_URL}${profile}/${name}${posts}`;
    const response = await authFetch(getMyProfileUrl);
    return await response.json(); 
}

export async function getProfile(name) { 
    if (!name) {
        throw new Error("Requires a name");
    } 
    const getProfileUrl = `${API_SOCIAL_URL}${profile}/${name}${posts}`;
    const response = await authFetch(getProfileUrl);
    return await response.json(); 
}
