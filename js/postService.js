import { getAuthHeader } from './auth.js';
import { API_BASE_URL } from '../js/constants.js';

/**
 * Fetches posts based on the current filter, search query, and pagination offset.
 * ...
 * @param {number} limit - The number of posts to fetch.
 * @param {number} offset - The number of posts to skip before starting to fetch.
 * @param {string} searchQuery - The search query to filter posts.
 * @param {string} currentFilter - The current filter applied to the posts.
 * @param {string} tagFilter - The tag filter applied to the posts.
 * @async
 * @function
 * @throws Will throw an error if the network response is not ok or other miscellaneous errors.
 * @returns {Promise<void>} No return value.
 */
export async function fetchPosts(limit, offset, searchQuery, currentFilter, tagFilter) {
    const loading = document.getElementById('loading');
    try {
        if (loading) {
            // Show the loading indicator
            loading.style.display = 'block';
        }
        const options = {
            headers: getAuthHeader(),
        };

        // Constructing URL using URL and URLSearchParams
        let url = new URL(`${API_BASE_URL}/social/posts`);
        let params = new URLSearchParams({
            limit: limit,
            offset: offset
        });

        if (searchQuery) {
            params.append('q', searchQuery);
        }

        if (currentFilter === 'newest') {
            params.append('sort', 'created');
            params.append('sortOrder', 'desc');
        } else if (currentFilter === 'oldest') {
            params.append('sort', 'created');
            params.append('sortOrder', 'asc');
        } else if (currentFilter === 'popular') {
            params.append('sort', 'likes');
            params.append('sortOrder', 'desc');
        }

        if (tagFilter) {
            params.append('_tag', tagFilter);
            params.append('_active', 'true');
            params.append('_author', 'true');
            params.append('_comments', 'true');
            params.append('_reactions', 'true');
        }

        url.search = params.toString();

        const response = await fetch(url.toString(), options);
        if (!response.ok) {
            console.error('Error Response:', await response.json());
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayPosts(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    } finally {
        if (loading) {
            loading.style.display = 'none';
        }
    }
}




/**
 * Sends a request to update a post with new data.
 * @async
 * @function
 * @param {string} id - The ID of the post to update.
 * @param {Object} updatedPost - An object containing the updated post data.
 * @throws Will throw an error if the request fails.
 */
export async function updatePost(id, updatedPost) {
    try {
        const options = {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        };
        const response = await fetch(`${API_BASE_URL}/social/posts/${id}`, options);
        if (!response.ok) {
            throw new Error('Failed to update post');
        }
        console.log('Post updated successfully');
        fetchPosts();
    } catch (error) {
        console.error('Error updating post:', error);
    }
}

/**
 * Sends a request to delete a post by ID.
 * @async
 * @function
 * @param {string} id - The ID of the post to delete.
 * @param {string} id - The ID of the post to update.
 * @throws Will throw an error if the request fails.
 */
export async function deletePost(id) {
    try {
        const confirmation = confirm('Are you sure you want to delete this post?');
        if (!confirmation) return;
        const options = {
            method: 'DELETE',
            headers: getAuthHeader(),
        };
        const response = await fetch(`${API_BASE_URL}/social/posts/${id}`, options);
        if (!response.ok) {
            throw new Error('Failed to delete post');
        }
        console.log('Post deleted successfully');
        fetchPosts(); // Refresh the posts

    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

/**
 * Handles the creation of a new post.
 * @async
 * @function
 * @param {Event} event - The event object from the form submission.
 * @throws Will throw an error if the request fails.
 */       
export async function createPost(event) {
    event.preventDefault();

    try {
        // Get form data
        const title = document.getElementById('postTitle').value || event.target.postTitle.value;
        const content = document.getElementById('postContent').value || event.target.postContent.value;
        const tags = (document.getElementById('postTags').value || event.target.postTags.value).split(',').map(tag => tag.trim());
        const fileInput = document.getElementById('formFile');
        const media = '';
        if (fileInput && fileInput.files[0]) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            const uploadResponse = await fetch(`${API_BASE_URL}/media`, {
                method: 'POST',
                headers: getAuthHeader(),
                body: formData,
            });
            if (uploadResponse.ok) {
                const uploadData = await uploadResponse.json();
                media = uploadData.filePath;
            } else {
                throw new Error('Image upload failed');
            }
            console.log('Image URL:', media);
        }
        const post = {
            title,
            body: content,
            media,
            tags,
        };
        const options = {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        };
        const response = await fetch(`${API_BASE_URL}/social/posts`, options);
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        const data = await response.json();
        console.log('Post created successfully:', data);
        fetchPosts();
    } catch (error) {
        console.error('Error creating post:', error);
    }
}