import { apiPath } from "../const";

/** Gets a specific profile with posts
 * 
 * @param {string} token 
 * @param {string} name 
 * @returns {array}
 */
export async function getProfile(token, name) {
    const response = await fetch(
        // hvordan kan jeg hente tags????
        `${apiPath}/social/profiles/${name}?posts?_reactions=true&_comments=true&_author=true`,
        {
            method: "get",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}