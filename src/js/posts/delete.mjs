import { API_BASE_URL } from "../routes.mjs";

export async function deletePost(postID) {
    try {
        const token = localStorage.getItem ('accessToken');
        const deleteData = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`${API_BASE_URL}/posts/${postID}`, deleteData);

        if (response.status ===204 || response.status ===200) {
            alert (`Post (ID ${postID}) was successfully deleted.`);
        } else {
            alert (`Sorry, you do not have permission to delete this post (ID ${postID}).`);
        }
    } catch (error) {
        alert(`An error occured, please try again later.`);
    }
}