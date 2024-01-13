
import { apiPath } from "../const.js";

/**
 * Gets posts with their title, body, tags, media, reactions, comments, when they were created and edited, id, author (and their details such as name, email & avatar) & number of comments and reactions
 * @param {string} token 
 * @returns {array} with objects/posts
*/
export async function getPosts(token, tag) {
    let url = `${apiPath}/social/posts?_author=true&_reactions=true&_comments=true`;
    if (tag !== undefined && tag !== null) {
        url += `&_tag=${tag}`
    }
    const response = await fetch(
        url,
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