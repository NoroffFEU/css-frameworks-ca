import { API_BASE_URL } from './util.js';
import { formatDate } from './util.js';

document.addEventListener('DOMContentLoaded', function () {


let postsData = [];

// Function to get the post author/user name from the URL
function getAuthorNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('authorName');
}

// Function to get the post author/user name from localStorage
function getAuthorNameFromLocalStorage() {
    return localStorage.getItem('userName');
}

// Choose the authorName based on URL or localStorage
const authorNameFromURL = getAuthorNameFromURL();
const authorNameFromLocalStorage = getAuthorNameFromLocalStorage();
const authorName = authorNameFromURL || authorNameFromLocalStorage;

// Set the document title
document.title = authorName ? `BS - ${authorName}'s profile` : 'BS - My Profile';

// Function to fetch posts of the specific author with the access token with a delay
async function fetchAuthorPosts(authorName) {
    const delayInMilliseconds = 50;

    try {
        document.getElementById('user-posts-container').innerHTML = 'Loading...';

        // delay
        setTimeout(async () => {
            const token = localStorage.getItem('accessToken');
            const fullUrl = `${API_BASE_URL}/api/v1/social/profiles/${authorName}/posts`;

            const getData = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(fullUrl, getData);
            console.log(response);

            if (response.ok) {
                const json = await response.json();
                console.log(json);

                // Set the author's name
                document.getElementById('authorNameDisplay').textContent = authorName;
                document.getElementById('profileNameDisplay').textContent = authorName;

                // Get the userName from localStorage
                const userName = localStorage.getItem('userName');

                // Hide or show logout button based on userName of authorName
                const logoutButton = document.getElementById('logoutButton');

                if (authorName !== userName) {
                    logoutButton.style.display = 'none';
                }

                 // Populate the postsData array with the fetched data
                postsData = json;

                // Display the posts of the specific author
                displayAuthorPosts(json);
            } else {
                console.error('Failed to fetch author posts');
            }
        }, delayInMilliseconds);
    } catch (error) {
        console.error('Error fetching author posts:', error);
    }
}

function displayAuthorPosts(posts) {
    const userPostsContainer = document.querySelector('#user-posts-container');

    userPostsContainer.innerHTML = '';

    // Loop through the posts and create HTML elements for each post
    posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('row', 'mb-3');

        // Replace backslashes with HTML line break tags
        const postTitleWithLineBreaks = post.title.replace(/\n/g, '<br>');

        postElement.innerHTML = `
        <div class="col-md-12 bg-white p-4 rounded shadow mb-4 mt-4">
          
          <p class="text-secondary">${formatDate(post.created)}</p>
          <p class="fs-4">${authorName}</p>
          <div class="shadow p-2">
          <p class="text-primary-emphasis">${postTitleWithLineBreaks}</p>
          <p class="post-content">${post.body}</p>
          ${post.media ? `<img src="${post.media}" alt="Post Image" class="img-fluid">` : ''}
          </div>
          <button class="btn btn-primary" onclick="editPost(${post.id})">Edit</button>
          <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>

        </div>
      `;
      
        userPostsContainer.appendChild(postElement);
    });
}

// Call the function to fetch and display posts of the specific author
fetchAuthorPosts(authorName);


// Function to edit a post
function editPost(postId) {
    console.log('Edit button clicked for post ID:', postId);
    const isProfilePage = window.location.pathname === '/profile/index.html';

    if (isProfilePage) {
        // Check if there are no query parameters in the URL
        const hasNoQueryParams = window.location.search === '';

        if (hasNoQueryParams) {
            // Find the post with the given postId
            const postToEdit = postsData.find(post => post.id === postId);

            if (!postToEdit) {
                alert('Post not found for editing');
                return;
            }

            // Show a prompt for the user to edit the post content
            const updatedContent = prompt('Edit the post content:', postToEdit.body);

            if (updatedContent === null) {
                return;
            }

            // Send a PUT request to update the post
            updatePost(postId, updatedContent);
        } else {
            alert('You can only edit your own posts.');
        }
    } else {
        alert('You can only edit your own posts.');
    }
}
  
  // Function to update a post via a PUT request
  async function updatePost(postId, updatedContent) {
    try {
      const token = localStorage.getItem('accessToken');
      const putData = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: updatedContent }),
      };
  
      const response = await fetch(`${API_BASE_URL}/api/v1/social/posts/${postId}`, putData);
  
      if (response.ok) {
        console.log('Post updated successfully');
        fetchWithToken(`${API_BASE_URL}/api/v1/social/posts`);
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
// Function to delete a post
function deletePost(postId) {
    console.log('Delete button clicked for post ID:', postId);
    const isProfilePage = window.location.pathname === '/profile/index.html';

    if (isProfilePage && window.location.search === '') {
        const confirmed = confirm('Are you sure you want to delete this post?');

        if (confirmed) {
            deletePostRequest(postId);
        }
    } else {
        alert('You can only delete your own posts.');
    }
}

// Function to send a DELETE request to delete a post
async function deletePostRequest(postId) {
    try {
        const token = localStorage.getItem('accessToken');
        const deleteData = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`${API_BASE_URL}/api/v1/social/posts/${postId}`, deleteData);

        if (response.ok) {
            console.log('Post deleted successfully');
            fetchWithToken(`${API_BASE_URL}/api/v1/social/posts`);
        } else {
            console.error('Failed to delete post');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}


  console.log("Fetching posts for author:", authorName);

});