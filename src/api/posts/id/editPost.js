import { apiPath } from "../../const.js";

/**
* Updates post with their title, body, tags, media, reactions, comments, when they were created and edited, id, author (and their details such as name, email & avatar) & number of comments and reactions
 * @param {string} token
 * @param {integer} postId
 * @param {string} title
 * @param {string} body
 * @param {array} tags
 * @param {string} media
* @returns {object} with post's new details
*/
export async function editPost(token, postId, title, body, tags, media) {
    const response = await fetch(
        `${apiPath}/social/posts/${postId}?_author=true&_reactions=true&_comments=true`,
        {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, body, tags, media }),
        },
    );
    if (response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}