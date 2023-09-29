import { getAuthHeader } from './auth.js';
import { API_BASE_URL } from '../js/constants.js';
import { state } from './main.js';

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
        // Call fetchPosts with limit and currentOffset from state
        fetchPosts(state.limit, state.currentOffset);
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

        // Call fetchPosts with limit and currentOffset from state
        fetchPosts(state.limit, state.currentOffset);

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
        fetchPosts(state.limit, state.currentOffset);
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

/**
 * Fetches all unique tags from all posts and populates the tag filter dropdown.
 * @async
 * @function
 * @throws Will throw an error if the request to fetch posts fails.
 */
export async function fetchAllTags() {
    const url = `${API_BASE_URL}/social/posts`;
    const options = {
        headers: getAuthHeader(),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    const posts = await response.json();
    // Extract all tags from all posts, flatten the array, and remove duplicates
    const allTags = posts.flatMap(post => post.tags);
    const uniqueTags = [...new Set(allTags)];

    // Get the tagFilter dropdown and populate it with the unique tags
    const tagFilterDropdown = document.getElementById('tagFilter');
    uniqueTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagFilterDropdown.appendChild(option);
    });
}
/**
 * Displays an array of posts on the page.
 * @function
 * @param {Array} posts - An array of post objects to display.
 */
export function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');
    if (postsContainer) {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('card', 'mb-4');
            const postImage = document.createElement('img');
            postImage.src = post.media || '/img/panda.jpg';
            postImage.onerror = () => {
                postImage.src = '/img/panda.jpg';
            };
            postImage.classList.add('card-img-top');
            postImage.alt = '';
            postCard.appendChild(postImage);
            const postBody = document.createElement('div');
            postBody.classList.add('card-body');
            const postTitle = document.createElement('h5');
            postTitle.classList.add('card-title');
            postTitle.textContent = post.title;
            postBody.appendChild(postTitle);
            const postContent = document.createElement('p');
            postContent.classList.add('card-text');
            postContent.textContent = post.body;
            postBody.appendChild(postContent);
            const readMoreButton = document.createElement('a');
            readMoreButton.href = `/postDetail/index.html?id=${post.id}`;
            readMoreButton.classList.add('btn', 'btn-primary');
            readMoreButton.textContent = 'Read More';
            postBody.appendChild(readMoreButton);
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-warning', 'me-2');
            editButton.onclick = () => editPost(post.id);
            postBody.appendChild(editButton);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.onclick = () => deletePost(post.id);
            postBody.appendChild(deleteButton);
            postCard.appendChild(postBody);
            postsContainer.appendChild(postCard);
        });
    } else {
        console.error('Container element not found');
    }
}
/**
 * Handles the editing of a post by prompting the user for a new title and content.
 * If the user cancels the operation at any prompt, an alert is shown, and the operation is cancelled.
 * @function
 * @param {string} id - The ID of the post to edit.
 */

export function editPost(id) {
    const title = prompt('Enter the new title:');
    if (title === null) {
        alert('Edit operation cancelled.');
        return;
    }
    
    const content = prompt('Enter the new content:');
    if (content === null) {
        alert('Edit operation cancelled.');
        return;
    }

    if (title && content) {
        const updatedPost = {
            title: title,
            body: content,
        };
        updatePost(id, updatedPost);
    }
}
