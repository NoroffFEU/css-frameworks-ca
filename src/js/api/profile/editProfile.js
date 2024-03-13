import { API_KEY, NN_BASE, NN_PROFILE } from "../constants.js";
import { load } from "../storage/load.js";
import { renderProfile } from "../../pages/profile/functions/renderProfile.js";

export async function editProfile(profileName, options) {
    const requestBody = {};

    if (options.bio) {
        requestBody.bio = options.bio;
    }

    if (options.bannerUrl) {
        requestBody.banner = { url: options.bannerUrl };
    }

    if (options.avatarUrl) {
        requestBody.avatar = { url: options.avatarUrl };
    }

    const response = await fetch(`${NN_BASE}${NN_PROFILE}${profileName}`, {
        headers: {
            Authorization: `Bearer ${load("token")}`,
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(requestBody)
    });

    if (response.ok) {
        const responseData = await response.json();
        renderProfile();
        return responseData;
    } else {
        throw new Error("Failed to update profile" + response.statusText);
    }
}
