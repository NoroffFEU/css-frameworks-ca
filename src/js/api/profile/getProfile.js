import { API_KEY, NN_BASE, NN_PROFILE } from "../constants.js";
import { load } from "../storage/load.js";

export async function getProfile(profileName, includeFollowers = true, includeFollowing = true, includePosts = true) {
    const queryParams = new URLSearchParams();
    if (includeFollowers) queryParams.append('_followers', includeFollowers);
    if (includeFollowing) queryParams.append('_following', includeFollowing);
    if (includePosts) queryParams.append('_posts', includePosts);

    const response = await fetch(`${NN_BASE}${NN_PROFILE}${profileName}?${queryParams}`, {
        headers: {
            Authorization: `Bearer ${load("token")}`,
            "X-Noroff-API-Key": API_KEY
        },
        method: "GET"
    });

    if (response.ok) {
        const responseData = await response.json();
        return responseData;
    } else {
        throw new Error("failed to fetch profile" + response.statusText);
    }
}