import { API_BASE_URL } from '../js/constants.js';
import { getAuthHeader } from './auth.js';
let currentFilter = 'newest';
let searchQuery = '';
let currentOffset = 0;
let limit = 10;

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