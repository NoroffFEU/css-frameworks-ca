import { apiPath } from "../const";

/**
 * Enables to unfollow a user
 * @param {string} token 
 * @param {string} nameOfFollowed 
 * @returns {object} with name of user (who unfollowed), avatar, number of followers and those who follow
 */
export async function unfollowUser(token, nameOfFollowed) {
    const response = await fetch(`${apiPath}/social/profiles/${nameOfFollowed}/unfollow`, {
        method: "put",
        //   body: JSON.stringify({

        //   }),
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