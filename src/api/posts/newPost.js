import { apiPath } from "../const";

/**
 * Enables to write a new post with its title, body, tags and media
 * 
 * @param {string} token
 * @param {string} title
 * @param {string} body
 * @param {array} tags
 * @param {array} media
 * @returns object with title, body, tags, media, reactions, comments, when they were created and edited, id, author (and their details such as name, email & avatar) & number of comments and reactions
 */
export async function newPost(token, title, body, tags, media) {
    const response = await fetch(`${apiPath}/social/posts?_author=true&_reactions=true&_comments=true`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body, tags, media }),
    });

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);

    if (response.ok) {
        return data;
    }

    throw new Error(JSON.stringify(data));
}