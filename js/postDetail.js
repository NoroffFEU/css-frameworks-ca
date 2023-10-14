/**
 * @module postDetail
 * @description Provides functionality to fetch and display post details.
 */
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
    } else {
        showErrorModal("No post ID provided in the URL. Please check the link and try again.");
    }
});
/**
 * Fetches a post by its ID.
 * @async
 * @function
 * @param {string} id - The ID of the post.
 * @throws Will show an error modal if the response is not ok.
 * @returns {Promise<void>} No return value.
 */
export async function fetchPostById(id) {
    const url = `${API_BASE_URL}/social/posts/${id}`;
    const options = {
        headers: getAuthHeader(),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        showErrorModal('Error fetching post by ID');
        return;
    }
    const post = await response.json();
    displayPostDetails(post);
}
/**
 * Shows an error modal with a provided message.
 * @function
 * @param {string} message - The error message to display in the modal.
 */
function showErrorModal(message) {
    const errorModalElement = document.getElementById('errorModal');
    if (!errorModalElement) {
        return;
    }
    const modalBody = errorModalElement.querySelector('.modal-body');
    modalBody.textContent = message;
    const errorModal = new bootstrap.Modal(errorModalElement);
    errorModal.show();
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
    
    if (postDetailsDiv) {
        postDetailsDiv.innerHTML = `
            <div class="card">
                <img src="${post.media || '/img/panda.jpg'}" class="card-img-top" alt="Post Image">
                <div class="card-body">
                    <h1 class="card-title">${post.title}</h1>
                    <p class="card-text">${post.body}</p>
                    <p class="post-id">Post ID: ${post.id}</p>
                </div>
            </div>
        `;
    } else {
        console.error('Element with id "postDetails" not found.');
    }
}
