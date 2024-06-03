import { authFetch } from "../authFetch.mjs";
import { API_POSTS, API_SOCIAL_URL } from "../constants.mjs";

// const method = "get";
const author = "?_author=true";
const comments = "&_comments=true";
const reactions = "&_reactions=true";

export async function getPosts() {
    try {
        const getPostsUrl = `${API_SOCIAL_URL}${API_POSTS}${author}${comments}${reactions}`;
        const response = await authFetch(getPostsUrl);
        return await response.json();     
    } catch (error) {
        console.error(error);
    }
}

export async function getPost(id) {
    try {
        if (!id) {
            throw new Error("You have to have a postID to get posts");
        } 
        const getPostUrl = `${API_SOCIAL_URL}${API_POSTS}/${id}${author}${comments}${reactions}`;
        const response = await authFetch(getPostUrl);
        return await response.json(); 
    } catch (error){
        console.error(error)
    }
}
