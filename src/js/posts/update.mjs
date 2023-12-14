import { API_BASE_URL } from "../routes.mjs";

export async function updatePost (postID, updatedTitle, updatedBody) {
    try {
        const updatedPostData = {
            title: updatedTitle,
            body: updatedBody,
        };

        const token = localStorage.getItem('accessToken');
        const updatedData = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedPostData),
        };

        const response = await fetch(`${API_BASE_URL}/posts/${postID}`, updatedData);

        if (response.ok) {
            alert('Post update was successful');
        } else {
            alert ('Unseccessful update, Please try again.');
        }
    } catch (error) {
        alert ('An error occured during post update, please try again later.');
    }
}