// posts.js

// Function to handle search when Enter key is pressed
function handleSearchEnter(event) {
    if (event.key === 'Enter') {
      const searchInput = document.getElementById('searchInput');
      const searchTerm = searchInput.value.trim().toLowerCase();
  
      // Filter posts that match the search term
      const filteredPosts = postsData.filter((post) => {
        const postTitle = post.title.toLowerCase();
        return postTitle.includes(searchTerm);
      });
  
      // Display the filtered posts
      displayPosts(filteredPosts);
    }
  }

// Function to format a date to the EU format (dd.mm.yyyy)
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();
    return `${day}.${month}.${year}`;

}

// Define a variable to store the posts data
let postsData = [];


// API base URL
const API_BASE_URL = 'https://api.noroff.dev';

// Function to fetch posts with the access token
async function fetchWithToken(url) {
    try {
      const token = localStorage.getItem('accessToken');
      const getData = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, getData);
      console.log(response);
      const json = await response.json();
      console.log(json);
  
      // Set the fetched posts to the postsData variable
      postsData = json;
  
      // Call a function to display the posts
      displayPosts(json);
    } catch (error) {
      console.log(error);
    }
  }

/// Function to display posts in the "User posts" section
function displayPosts(posts, filterDate) {
    const userPostsContainer = document.querySelector('#user-posts-container');

  // Filter posts based on the provided date if a date is selected
  const filteredPosts = filterDate
    ? posts.filter((post) => post.created.startsWith(filterDate))
    : posts;
  
    // Clear the user posts container
    userPostsContainer.innerHTML = '';
  
    // Loop through the filtered posts and create HTML elements for each post
    filteredPosts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('row', 'mb-3');

      // Replace backslashes with HTML line break tags
      const postTitleWithLineBreaks = post.title.replace(/\n/g, '<br>');

      postElement.innerHTML = `
        <div class="col-md-12 bg-white px-5 py-4">
          <hr>
          <p class="text-secondary">${formatDate(post.created)}</p>
          <p class="text-primary-emphasis">${postTitleWithLineBreaks}</p>
          ${post.media ? `<img src="${post.media}" alt="Post Image" class="img-fluid">` : ''}
          <hr>
        </div>
      `;
      userPostsContainer.appendChild(postElement);
    });
  }

  
// Function to send a new post to the API
async function sendNewPost(title, content) {
  try {
    const token = localStorage.getItem('accessToken');
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    };

    const response = await fetch(`${API_BASE_URL}/api/v1/social/posts`, postData);
    console.log(response);

    if (response.ok) {
      // Post was successfully created
      console.log('Post created successfully');
      // Call the fetchWithToken function to refresh the posts list
      fetchWithToken(`${API_BASE_URL}/api/v1/social/posts`);
    } else {
      // Handle error when post creation fails
      console.error('Failed to create post');
    }
  } catch (error) {
    console.log(error);
  }
}

// Handle form submission to send a new post
const blogPostForm = document.getElementById('blog-post-form');
blogPostForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const postTitle = document.getElementById('postTitle').value;


  // Call the sendNewPost function to send the new post to the API
  sendNewPost(postTitle);

  // Clear the form fields after submission
  blogPostForm.reset();
});

// Call the fetchWithToken function to load posts when the page loads
fetchWithToken(`${API_BASE_URL}/api/v1/social/posts`);

const filterButton = document.getElementById('filterButton');

filterButton.addEventListener('click', () => {
  // Get the filter values from input fields
  const filterDate = document.getElementById('filterDate').value;

  // Call displayPosts with the filters
  displayPosts(postsData, filterDate);
});

const clearDateButton = document.getElementById('clearDateButton');

clearDateButton.addEventListener('click', () => {
  // Clear the date filter input field
  document.getElementById('filterDate').value = '';

  // Call displayPosts to refresh and display all posts
  displayPosts(postsData, '');
});