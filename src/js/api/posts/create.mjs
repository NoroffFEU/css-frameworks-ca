import { API_POSTS, API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { load } from "../../storage/index.mjs";

const method = "post";
const author = "?_author=true";
//const action = "/posts";

export async function createPost(postData) {
    const createUrl = `${API_SOCIAL_URL}${API_POSTS}${author}`;
    try {
        const profileData = load("profile").name;
        const postDataWithAuthor = { ...postData, author: profileData };
        const response = await authFetch(createUrl, {
            method,
            body: JSON.stringify(postDataWithAuthor)
        });
        if (response.ok) {
            const createdPost = await response.json();
            let posts = JSON.parse(localStorage.getItem("posts")) || [];
            posts.push(createdPost)
            localStorage.setItem("posts", JSON.stringify(posts));
            window.location.href = "/profile/myProfile/";
            return await createdPost;                 
        } else {
            throw new Error ("Failed to create post");                          
        }
    } catch (error) {
        console.error("Failed to create post")
        throw error;
    }
} 