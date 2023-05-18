import { API_SOCIAL_URL } from "../constants.js";

import { authFetch } from "../authFetch.js";

const action = "/profiles";
const method = "put";


export async function updateProfile(profileData) {
    if (!profileData.name) {
        throw new Error("Profile update requires a profile name");
    }
    const updateProfileUrl = `${API_SOCIAL_URL}${action}/${profileData.name}/media`;

    const response = await authFetch(updateProfileUrl, {
        method,
        body: JSON.stringify(profileData)
    });
    if (response.status == 200) {
        window.location.reload();

    } else {
        const json = await response.json();
        alert(json.errors[0].message);
    }
}