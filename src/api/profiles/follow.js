import { apiPath } from "../const";

/**
 * Enables to follow a user
 * @param {string} token 
 * @param {string} nameOfFollowed 
 * @returns {object} with name of user (who started to follow), avatar, number of followers and those who are followed (their name and avatar)
 */
export async function followUser(token, nameOfFollowed) {
    const response = await fetch(`${apiPath}/social/profiles/${nameOfFollowed}/follow`, {
        method: "put",
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