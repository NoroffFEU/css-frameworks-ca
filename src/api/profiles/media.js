import { apiPath } from "../const";

/**
 * Updates an avatar of a user
 * @param {string} token 
 * @param {string} userName
 * @returns {object} with user's name, email, avatar
 */
export async function followUser(token, userName, avatarUrl) {
    const response = await fetch(`${apiPath}/social/profiles/${userName}/media`, {
        method: "put",
        body: JSON.stringify({
            avatar: avatarUrl,
        }),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}