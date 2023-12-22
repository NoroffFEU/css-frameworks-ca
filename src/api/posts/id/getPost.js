import { apiPath } from "../../const";

/**
* Gets posts with their title, body, tags, media, reactions, comments, when they were created and edited, id, author (and their details such as name, email & avatar) & number of comments and reactions
*@param {string} token 
*@param {integer} postId
* @returns {object} with post's details
*/

export async function getPost(token, postId) {
    const response = await fetch(
        // hvordan kan jeg hente tags????
        `${apiPath}/social/posts/${postId}?_author=true&_reactions=true&_comments=true`,
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