import { API_SOCIAL_URL } from "../api/api_constants.mjs";
import { action } from "../api/posts/getPost.mjs";
import { accessToken } from "../api/posts/getPost.mjs";
import { displayPosts } from "../api/posts/getPost.mjs";

const searchInput = document.getElementById('searchInput');

// Listen for input events on the search input field
searchInput.addEventListener('input', function() {
    handleSearch();
});

/**
 * Handles the search functionality to filter and display posts.
 * @returns {void}
 */
async function handleSearch() {
    // Get the search term entered by the user
    const searchTerm = searchInput.value.toLowerCase();

    try {
        const updatePostUrl = `${API_SOCIAL_URL}${action}?_author=true`; 

        const response = await fetch(updatePostUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();

        // Filter the posts based on the search term
        const filteredPosts = posts.filter(post => {
            return post.title.toLowerCase().includes(searchTerm);
        });

        // Display the filtered posts
        displayPosts(filteredPosts);
    } catch (error) {
        console.error('Error fetching and filtering posts:', error.message);
    }
}

