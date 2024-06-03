import { API_SOCIAL_URL } from "../constants.mjs"
import { authFetch } from "../authFetch.mjs";

const method = "put";
const action = "/profiles";

export async function updateProfile(profileData) {
    if (!profileData.name) {
        throw new Error("Requires a name");
    } 
    const updateProfileUrl = `${API_SOCIAL_URL}${action}/${profileData.name}/media`;
    const response = await authFetch(updateProfileUrl, {
        method,
        body: JSON.stringify(profileData),
    });

    window.location.href = "/profile/myProfile/";
    return await response.json();
}  
