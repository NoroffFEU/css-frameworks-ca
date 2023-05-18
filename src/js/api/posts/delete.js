import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "delete";

export async function removePost(id) {
    if (!id) {
        throw new Error("Delete requires a postID");
    }
    const removePostUrl = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(removePostUrl, {
        method,
    });
    if (response.ok) {
        window.location.reload();
    } else {
        const json = await response.json();
        alert(json.errors[0].message);
    }
}