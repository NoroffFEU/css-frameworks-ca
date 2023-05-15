import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

export async function createPost(postData) {
    const createPostUrl = API_SOCIAL_URL + action;

    const response = await authFetch(createPostUrl, {
        method,
        body: JSON.stringify(postData)
    })
    const post = await response.json();
    console.log(post);
    window.location.reload();
}

export async function createComment(commentData) {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    let id = params.get("id");
    const createCommentUrl = `${API_SOCIAL_URL}${action}/${id}/comment`;

    const response = await authFetch(createCommentUrl, {
        method,
        body: JSON.stringify(commentData)
    })
    const comment = await response.json();
    console.log(comment);
    window.location.reload();
}