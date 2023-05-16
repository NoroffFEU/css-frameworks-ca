import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "delete";

export async function deletePost(id) {
    if (!id) {
        throw new Error("Delete a post requires a postID");
    }

    const deletePostUrl = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(deletePostUrl, {
        method
    })
    // return await response.json();

    const post = await response.json();
    console.log(post);
    // console.log("The post was deleted.");
    if (response.status == 200) {
        window.location.reload();

    } else {
        const json = await response.json();
        alert(json.errors[0].message);
    }
};