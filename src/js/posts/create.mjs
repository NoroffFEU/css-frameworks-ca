import { API_BASE_URL } from "../routes.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";

/** 
* this let us create posts
* @param {string} postData
* @returns
*/
export async function createPost(postData) {
    postData.tags = postData.tags.split(" ");
    const createPosturl = API_BASE_URL + action;
    const response = await authFetch(createPosturl, {
        method: "post",
        body: JSON.stringify(postData),
    });
    const result = await response.json();
    alert("Your post has been created");
    window.location.replace("/posts/index.html" || "/posts");
    return result;
}