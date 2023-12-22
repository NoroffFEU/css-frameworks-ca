import { apiPath } from "../../const";

/**
* Gets posts with their title, body, tags, media, reactions, comments, when they were created and edited, id, author (and their details such as name, email & avatar) & number of comments and reactions
*@param {string} token 
*@param {integer} postId
* @returns {} 
*/

export async function deletePost(token, postId) {
    const response = await fetch(

        `${apiPath}/social/posts/${postId}`,
        {
            method: "delete",
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