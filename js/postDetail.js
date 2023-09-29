import { getAuthHeader } from './auth.js';
import { API_BASE_URL } from '../js/constants.js';
/**
 * Event listener for DOMContentLoaded to fetch post by ID from URL parameters.
 * @listens document:DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (postId) {
        fetchPostById(postId);
    }
});
/**
 * Fetches a post by its ID.
 * @async
 * @function
 * @param {Object} param0 - The ID object.
 * @param {string} param0.id - The ID of the post.
 * @throws Will throw an error if the response is not ok.
 * @returns {Promise<void>} No return value.
 */
export async function fetchPostById(id) {
    const url = `${API_BASE_URL}/social/posts/${id}`;
    const options = {
        headers: getAuthHeader(), // make sure getAuthHeader is imported or available in this file
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Error fetching post by ID');
    }
    const post = await response.json();
    displayPostDetails(post);
}
/**
 * Displays the details of a post.
 * @function
 * @param {Object} post - The post object.
 * @param {string} post.media - The media URL of the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body content of the post.
 */
export function displayPostDetails(post) {
    const postDetailsDiv = document.getElementById('postDetails');
    postDetailsDiv.innerHTML = `
        <div class="card">
            <img src="${post.media || '/img/panda.jpg'}" class="card-img-top" alt="Post Image">
            <div class="card-body">
                <h1 class="card-title">${post.title}</h1>
                <p class="card-text">${post.body}</p>
        </div>
    `;
}