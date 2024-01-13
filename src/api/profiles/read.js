import { apiPath } from "../const.js";

/** Gets all profiles
 * 
 * @param {string} token 
 * @returns {object}
 */
export async function getProfiles(token) {
    const response = await fetch(`${apiPath}/social/profiles`, {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}

