
const username = localStorage.getItem('userName');
const nameofuserDiv = document.querySelector('.nameofuser');

// API base URL
const API_BASE_URL = 'https://api.noroff.dev';

nameofuserDiv.textContent = username;

// Function to handle search when Enter key is pressed
function handleSearchEnter(event) {
    if (event.key === 'Enter') {
      const searchInput = document.getElementById('searchInput');
      const searchTerm = searchInput.value.trim().toLowerCase();
  
      // Filter posts that match the search term
      const filteredPosts = postsData.filter((post) => {
        const postTitle = post.title.toLowerCase();
        const postBody = post.body.toLowerCase();
        return postTitle.includes(searchTerm) || postBody.includes(searchTerm);
      });
  
      // Display the filtered posts
      displayPosts(filteredPosts);
    }
}

// Function to format a date to the EU format (dd/mm/yyyy)
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();
    return `${day}.${month}.${year}`;

}

// Define a variable to store the posts data
let postsData = [];

// Function to fetch posts with the access token
async function fetchWithToken(url) {
  try {
      const token = localStorage.getItem('accessToken');

      // Include the author parameter with a value of true in the query string
      const fullUrl = `${url}?_author=true`;
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
          
          // Check if the author data is included in the response
          if (json && json.length > 0 && json[0]._author) {

              const authorName = json[0]._author.name;
              console.log(`Author Name: ${authorName}`);
          }

          // Set the fetched posts to the postsData variable
          postsData = json;

          displayPosts(json);
      } else {
          console.error('Failed to fetch posts');
      }
  } catch (error) {
      console.log(error);
  }
}

// Function to display posts in the "User posts" section
function displayPosts(posts, filterDate) {
  const userPostsContainer = document.querySelector('#user-posts-container');
  const modalBackdrop = document.createElement('div');
  modalBackdrop.id = 'post-modal-backdrop';
  modalBackdrop.classList.add('modal-backdrop');
  document.body.appendChild(modalBackdrop);

  const filteredPosts = filterDate
    ? posts.filter((post) => post.created.startsWith(filterDate))
    : posts;

  userPostsContainer.innerHTML = '';

  // Loop through the filtered posts and create HTML elements for each post
  filteredPosts.forEach((post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('row', 'mb-3');

    // Replace backslashes with HTML line break tags to get more lines if user posts more than one line
    const postTitleWithLineBreaks = post.title.replace(/\n/g, '<br>');

    // Include the author's name in the post
    const authorName = post.author.name;

    postElement.innerHTML = `
      <div class="col-md-12 bg-white p-4 rounded shadow mb-4 mt-4">
        <div class="row">
          <div class="col-md-6">
            <p class="text-secondary">${formatDate(post.created)}</p>
            <p class="fs-5">${authorName}</p>
          </div>
          <div class="col-md-6 text-end">
            <a href="#" onclick="openUserProfile('${post.author.name}')" class="ms-2">View ${post.author.name}'s profile</a>
          </div>
        </div>
        <div class="shadow p-2">
          <p class="text-primary-emphasis">${postTitleWithLineBreaks}</p>
          <p class="post-content">${post.body}</p>
          ${post.media ? `<img src="${post.media}" alt="Post Image" class="img-fluid">` : ''}
        </div>
        <button class="btn btn-primary" onclick="openPostModal(${post.id})">View Post</button>
        </div>
    `;

    userPostsContainer.appendChild(postElement);
  });
}


// Function to send a new post to the API
async function sendNewPost(title, body, media) {
  try {
    const token = localStorage.getItem('accessToken');
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body, media }),
    };

    const response = await fetch(`${API_BASE_URL}/api/v1/social/posts`, postData);

    if (response.ok) {
      console.log('Post created successfully');
      fetchWithToken(`${API_BASE_URL}/api/v1/social/posts`);
    } else {
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
  const postBody = document.getElementById('postBody').value;
  const postMedia = document.getElementById('postMedia').value;

  sendNewPost(postTitle, postBody, postMedia);

  blogPostForm.reset();
});



// Call the fetchWithToken function to load posts when the page loads
fetchWithToken(`${API_BASE_URL}/api/v1/social/posts`);

// Add an event listener to the radio buttons for sorting
const sortOptions = document.querySelectorAll('input[name="sortOption"]');
sortOptions.forEach((option) => {
  option.addEventListener('change', () => {
    
    const selectedOption = document.querySelector('input[name="sortOption"]:checked').value;
    
    // Sort the posts based on the selected option
    if (selectedOption === 'newest') {
      postsData.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (selectedOption === 'oldest') {
      postsData.sort((a, b) => new Date(a.created) - new Date(b.created));
    }
    
    displayPosts(postsData);
  });
});

function openUserProfile(authorName) {

  // Redirect to the user's profile page and pass the authorName as a query parameter
  window.location.href = `/profile/index.html?authorName=${authorName}`;
}


function viewPost(postId) {
  // Find the post with the specified postId in the postsData array
  const post = postsData.find((post) => post.id === postId);

  if (post) {
    // Create a new window or tab to display the post details
    const postWindow = window.open('', '_blank');
    postWindow.document.write(`
      <html>
      <head>
        <title>Post Details</title>
      </head>
      <body>
        <h1>${post.title}</h1>
        <p>Author: ${post.author.name}</p>
        <p>Created: ${formatDate(post.created)}</p>
        <p>${post.body}</p>
        ${post.media ? `<img src="${post.media}" alt="Post Image" class="img-fluid">` : ''}
      </body>
      </html>
    `);
  }
}

function openPostModal(postId) {
  const post = postsData.find((post) => post.id === postId);

  if (post) {
    const modalBackdrop = document.getElementById('post-modal-backdrop');
    const modal = document.createElement('div');
    modal.classList.add('modal-popup');
    modal.innerHTML = `
      <h1>${post.title}</h1>
      <p>Author: ${post.author.name}</p>
      <p>Created: ${formatDate(post.created)}</p>
      <p>${post.body}</p>
      ${post.media ? `<img src="${post.media}" alt="Post Image" class="img-fluid">` : ''}
      <button onclick="closePostModal()">Close</button>
    `;
    document.body.appendChild(modal);

    modalBackdrop.style.display = 'block';
    modal.style.display = 'block';

    // Click event listener to the modal backdrop
    modalBackdrop.addEventListener('click', function (event) {
      if (event.target === modalBackdrop) {
        closePostModal();
      }
    });
  }
}

function closePostModal() {
  const modalBackdrop = document.getElementById('post-modal-backdrop');
  const modal = document.querySelector('.modal-popup');

  if (modal) {
    document.body.removeChild(modal);
    modalBackdrop.style.display = 'none';

    // Remove the click event listener from the modal backdrop
    modalBackdrop.removeEventListener('click', function (event) {
      if (event.target === modalBackdrop) {
        closePostModal();
      }
    });
  }
}