import { API_SOCIAL_URL } from "../api/api_constants.mjs";
import { action } from "../api/posts/getPost.mjs";
import { accessToken } from "../api/posts/getPost.mjs";
import { displayPosts } from "../api/posts/getPost.mjs";


const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    handleSearch();
});


async function handleSearch() {
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

        const filteredPosts = posts.filter(post => {
            return post.title.toLowerCase().includes(searchTerm);
        });

        displayPosts(filteredPosts);
    } catch (error) {
        console.error('Error fetching and filtering posts:', error.message);
    }
}