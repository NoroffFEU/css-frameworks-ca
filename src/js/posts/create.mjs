
import { API_BASE_URL } from "../routes.mjs";
//import { fetchwithToken } from "./index.mjs";

export async function createNewPost (postTitle, postContent, accessToken) {
    try {
        const postData = {
            title: postTitle,
            body: postContent,
        };

        if (!accessToken) {
            return;
        }

        const response = await fetch (`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify (postData),
        });

        if (response.ok) {
            const newPost = await response.json();
            alert (`New post added (ID ${newPost.id})`);
            return newPost;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

//fetchwithToken(API_BASE_URL + '/posts');

