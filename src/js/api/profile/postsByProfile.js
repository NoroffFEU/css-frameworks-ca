import { API_KEY, NN_BASE, NN_PROFILE } from "../constants.js";
import { load } from "../storage/load.js";

export async function getPostsByProfile (profileName) {
    const response = await fetch(`${NN_BASE}${NN_PROFILE}${profileName}/posts`, {
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
        throw new Error("Failed to get posts" + response.statusText);
    }
}