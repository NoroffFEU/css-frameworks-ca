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
 * renderPosts(filteredPosts);
 */
const renderPosts = (posts) => {
  const postsContainer = document.querySelector('.all-posts_card-container');
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const postElement = createCardAllPosts(post);
    postsContainer.appendChild(postElement);
  });
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
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  // Extracts and trims the search term from the input field.
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();

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
