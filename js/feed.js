import { API_BASE_URL } from '../js/constants.js';

let currentFilter = 'newest'; // Default filter
let searchQuery = '';

window.getAuthHeader = function() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No access token found in local storage');
    }
    return {
        Authorization: `Bearer ${token}`,
    };
};


let currentOffset = 0; // Start from the first result
const limit = 10; // Number of results per page

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


document.getElementById('searchBar').addEventListener('input', (event) => {
    event.preventDefault();
    searchQuery = event.target.value;
    fetchPosts();
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentOffset += limit;
    fetchPosts();
  });
  
  document.getElementById('prevPage').addEventListener('click', () => {
    currentOffset = Math.max(0, currentOffset - limit); // Ensure offset is not negative
    fetchPosts();
  });
  

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

            postCard.appendChild(postBody);
            postsContainer.appendChild(postCard);
        });
    } else {
        console.error('Container element not found');
    }
}

document.getElementById('sortNewest').addEventListener('click', () => {
    currentFilter = 'newest';
    fetchPosts();
});

document.getElementById('sortOldest').addEventListener('click', () => {
    currentFilter = 'oldest';
    fetchPosts();
});

document.getElementById('sortPopular').addEventListener('click', () => {
    currentFilter = 'popular';
    fetchPosts();
});

document.getElementById('tagFilter').addEventListener('change', () => {
    currentOffset = 0; // Reset the offset when filter changes
    fetchPosts();
});



// Call the fetchPosts function when the page loads
document.addEventListener('DOMContentLoaded', fetchPosts);

        
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

// Add event listener to the form
document.getElementById('postForm').addEventListener('submit', createPost);

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

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchAllTags();
    fetchPosts(); // Your existing fetchPosts function call
});
document.addEventListener('DOMContentLoaded', () => {
    const postId = window.location.pathname.split('/').pop();
    fetchPostById(postId);
  });
 