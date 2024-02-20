import { API_SOCIAL_URL } from "../api/api_constants.mjs";
import { accessToken, action } from "../api/posts/getPost.mjs";
import { displayPosts } from "../api/posts/getPost.mjs";
import { getPosts } from "../api/posts/getPost.mjs";


/**
 * Represents an array of posts.
 * @type {Array} posts
 */

let posts = [];

/**
 * Fetches and displays posts from the Noroff social media API.
 * @returns {Promise} A promise that resolves once posts are fetched and displayed.
 */
async function fetchAndDisplayPosts() {
    try {
        const response = await fetchPosts();
        posts = await response.json(); 
        displayPosts(posts); 
    } catch (error) {
        console.error("Error fetching and displaying posts:", error);
    }
}

/**
 * Fetches posts from the Noroff social media API.
 * @returns {Promise} A promise that resolves with the fetched posts.
 * @throws {Error} If fetching posts fails.
 */
async function fetchPosts() {
    const updatePostUrl = `${API_SOCIAL_URL}${action}?_author=true`;

    const response = await fetch(updatePostUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return response;
}

fetchAndDisplayPosts();

const sortSelect = document.getElementById("inputState");

/**
 * Handles sorting of posts based on user-selected option.
 * @returns {void}
 */

async function handleSort() {
    const selectedOption = sortSelect.value;

    if (selectedOption === "Sort from Newest to Oldest") {
        posts.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (selectedOption === "Sort from Oldest to Newest") {
        posts.sort((a, b) => new Date(a.created) - new Date(b.created));
    }

    displayPosts(posts);
}

// Event listener for sorting select element
sortSelect.addEventListener("change", handleSort);




