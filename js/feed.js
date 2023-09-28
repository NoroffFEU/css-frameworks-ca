import { API_BASE_URL } from '../js/constants.js';
import { getAuthHeader } from './auth.js';
let currentFilter = 'newest';
let searchQuery = '';
/**
 * Retrieves the authorization header from local storage.
 * @function
 * @throws Will throw an error if no access token is found in local storage.
 * @returns {Object} Returns an object with the Authorization header.
 */
window.getAuthHeader = function() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No access token found in local storage');
    }
    return {
        Authorization: `Bearer ${token}`,
    };
};
let currentOffset = 0;
const limit = 10;
/**
 * Fetches posts based on the current filter, search query, and pagination offset.
 * @async
 * @function
 * @throws Will throw an error if the network response is not ok or other miscellaneous errors.
 * @returns {Promise<void>} No return value.
 */
async function fetchPosts() {
    const loading = document.getElementById('loading');
    try {
        if (loading) {
            // Show the loading indicator
            loading.style.display = 'block';
        }

        const options = {
            headers: getAuthHeader(),
        };

        let url = `${API_BASE_URL}/social/posts`;
        let queryParams = [`limit=${limit}`, `offset=${currentOffset}`];

        if (searchQuery) {
            queryParams.push(`q=${searchQuery}`);
        }

        if (currentFilter === 'newest') {
            queryParams.push('sort=created');
            queryParams.push('sortOrder=desc');
        } else if (currentFilter === 'oldest') {
            queryParams.push('sort=created');
            queryParams.push('sortOrder=asc');
        } else if (currentFilter === 'popular') {
            queryParams.push('sort=likes');
            queryParams.push('sortOrder=desc');
        }

        let tagFilter = document.getElementById('tagFilter').value;
        if (tagFilter) {
            queryParams.push(`_tag=${tagFilter}`);
            queryParams.push(`_active=true`);
            queryParams.push(`_author=true`);
            queryParams.push(`_comments=true`);
            queryParams.push(`_reactions=true`);
        }

        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }
        
        const response = await fetch(url, options);

        if (!response.ok) {
            console.error('Error Response:', await response.json());
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        //console.log('Data fetched successfully:', data);

        displayPosts(data);

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    } finally {
        // Check if loading element is found
        if (loading) {
            // Hide the loading indicator
            loading.style.display = 'none';
        }
    }
}
/**
 * Event listener for search bar input.
 * Updates the search query and fetches posts based on the input value.
 * @listens searchBar:input
 */
document.getElementById('searchBar').addEventListener('input', (event) => {
    event.preventDefault();
    searchQuery = event.target.value;
    fetchPosts();
});
/**
 * Event listener for next page button click.
 * Increments the current offset by the limit and fetches posts.
 * @listens nextPage:click
 */
document.getElementById('nextPage').addEventListener('click', () => {
    currentOffset += limit;
    fetchPosts();
  });
/**
 * Event listener for previous page button click.
 * Decrements the current offset by the limit and fetches posts.
 * Ensures offset is not negative.
 * @listens prevPage:click
 */
document.getElementById('prevPage').addEventListener('click', () => {
    currentOffset = Math.max(0, currentOffset - limit); // Ensure offset is not negative
    fetchPosts();
  });
/**
 * Displays an array of posts on the page.
 * @function
 * @param {Array} posts - An array of post objects to display.
 */
  function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');
    if (postsContainer) {
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('card', 'mb-4');

            const postImage = document.createElement('img');
            postImage.src = post.media || '/img/panda.jpg'; // Use post media if available, otherwise use a default image
            postImage.onerror = () => {
                postImage.src = '/img/panda.jpg'; // Set to a default image if the original image fails to load
            };
            postImage.classList.add('card-img-top');
            postImage.alt = 'Post Image';
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
            readMoreButton.href = `/postDetail/index.html?id=${post.id}`; // Add the post ID as a query parameter
            readMoreButton.classList.add('btn', 'btn-primary');
            readMoreButton.textContent = 'Read More';
            postBody.appendChild(readMoreButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-warning', 'me-2');
            editButton.onclick = () => editPost(post.id); // Add this function
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
 * Handles the editing of a post by prompting the user for new title and content.
 * @function
 * @param {string} id - The ID of the post to edit.
 */
function editPost(id) {
    const title = prompt('Enter the new title:');
    const content = prompt('Enter the new content:');
    if (title && content) {
        const updatedPost = {
            title: title,
            body: content,
        };
        updatePost(id, updatedPost);
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
async function updatePost(id, updatedPost) {
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
        fetchPosts(); // Refresh the posts

    } catch (error) {
        console.error('Error updating post:', error);
    }
}
/**
 * Sends a request to delete a post by ID.
 * @async
 * @function
 * @param {string} id - The ID of the post to delete.
 * @throws Will throw an error if the request fails.
 */
async function deletePost(id) {
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
 * Event listener for sort newest button click.
 * Sets the current filter to 'newest' and fetches posts.
 * @listens sortNewest:click
 */
document.getElementById('sortNewest').addEventListener('click', () => {
    currentFilter = 'newest';
    fetchPosts();
});
/**
 * Event listener for sort oldest button click.
 * Sets the current filter to 'oldest' and fetches posts.
 * @listens sortOldest:click
 */
document.getElementById('sortOldest').addEventListener('click', () => {
    currentFilter = 'oldest';
    fetchPosts();
});
/**
 * Event listener for sort popular button click.
 * Sets the current filter to 'popular' and fetches posts.
 * @listens sortPopular:click
 */
document.getElementById('sortPopular').addEventListener('click', () => {
    currentFilter = 'popular';
    fetchPosts();
});
/**
 * Event listener for tag filter change.
 * Resets the current offset and fetches posts based on the selected tag.
 * @listens tagFilter:change
 */
document.getElementById('tagFilter').addEventListener('change', () => {
    currentOffset = 0; // Reset the offset when filter changes
    fetchPosts();
});
/**
 * Event listener for document DOMContentLoaded.
 * Calls the fetchPosts function when the page loads.
 * @listens document:DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', fetchPosts);
/**
 * Handles the creation of a new post.
 * @async
 * @function
 * @param {Event} event - The event object from the form submission.
 * @throws Will throw an error if the request fails.
 */       
async function createPost(event) {
    event.preventDefault();

    try {
        // Get form data
        const title = document.getElementById('postTitle').value || event.target.postTitle.value;
        const content = document.getElementById('postContent').value || event.target.postContent.value;
        const tags = (document.getElementById('postTags').value || event.target.postTags.value).split(',').map(tag => tag.trim());
        const fileInput = document.getElementById('formFile');
        let media = event.target.formFile.value; // Assuming formFile is the ID of the file input

        // If a file was selected, prepare it for upload
        if (fileInput && fileInput.files[0]) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            const uploadResponse = await fetch(`${API_BASE_URL}/media`, {
                method: 'POST',
                headers: getAuthHeader(),
                body: formData,
            });
            const uploadData = await uploadResponse.json();
            media = uploadData.filePath;
        }

        // Create post object
        const post = {
            title,
            body: content,
            media,
            tags,
        };

        // Send POST request to create a new post
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

        // Fetch and display the updated list of posts
        fetchPosts();

    } catch (error) {
        console.error('Error creating post:', error);
    }
}
/**
 * Event listener for post form submit.
 * Calls the createPost function when the form is submitted.
 * @listens postForm:submit
 */
document.getElementById('postForm').addEventListener('submit', createPost);
/**
 * Fetches all unique tags from all posts and populates the tag filter dropdown.
 * @async
 * @function
 * @throws Will throw an error if the request to fetch posts fails.
 */
async function fetchAllTags() {
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
 * Event listener for document DOMContentLoaded.
 * Calls the fetchAllTags and fetchPosts functions when the page loads.
 * @listens document:DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchAllTags();
    fetchPosts();
});