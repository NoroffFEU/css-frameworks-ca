import { createCardAllPosts } from "./fetchAllPosts.mjs";
import { fetchPostsWithToken } from "./accessToken.mjs";
import { apiBaseUrl, allPostsApi } from "./script.mjs";

// Array to store fetched posts
let posts = [];

// URL to the fetch API
const APIURL = `${apiBaseUrl}${allPostsApi}?_author=true`

/**
 * Renders all the posts in the selected container.
 *
 * @param {Object[]} posts An array of post objects to be rendered.
 * @example
 * Assume filteredPosts is an array of post objects obtained through some filtering mechanism.
 * renderPosts(filteredPosts);
 */
const renderPosts = (posts) => {
  const postsContainer = document.querySelector('.all-posts_card-container');
  postsContainer.innerHTML = '';

  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value;

  if (posts.length === 0) {
     // If no posts are found, display a message
    const noResultsMessage = document.createElement("p");
    noResultsMessage.className = "d-flex justify-content-center bold";
    noResultsMessage.innerText = `Search result "${searchTerm}" not found.`;
    postsContainer.appendChild(noResultsMessage);
    console.log(noResultsMessage);
  } else {
     // Render the posts
    posts.forEach(post => {
      const postElement = createCardAllPosts(post);
      postsContainer.appendChild(postElement);
    });
  }
}

/**
 * Filters posts based on the provided search text and renders the filtered posts.
 *
 * @param {string} inputText The search text to filter posts.
 * @example
 * filterPosts(searchTerm);
 */
const filterPosts = (inputText) => {
  const filteredPosts = posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(inputText.toLowerCase());
    const contentMatch = post.body?.toLowerCase().includes(inputText.toLowerCase());
    const userMatch = post.author.name.toLowerCase().includes(inputText.toLowerCase());
    return titleMatch || contentMatch || userMatch;
  });
  renderPosts(filteredPosts);
}

// Adds an event listener to the search form, preventing its default submission behavior.
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  // Extracts and trims the search term from the input field.
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    // If search term is empty, render all posts
    return renderPosts(posts);
  }


  // Call the filterPosts function with the search term
  filterPosts(searchTerm);
});

// Initializes the app by fetching posts and rendering them
const initialize = async () => {
  try {
      // Fetch posts from the API
    posts = await fetchPostsWithToken(APIURL);
    // Render the fetched posts
    renderPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Call the initialize function to start the app
initialize();
