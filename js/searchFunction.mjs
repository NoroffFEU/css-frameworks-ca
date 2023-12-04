import { createCardAllPosts } from "./fetchAllPosts.mjs";
import { fetchPostsWithToken } from "./accessToken.mjs";
import { apiBaseUrl, allPostsApi } from "./script.mjs";


let posts = [];

const APIURL = `${apiBaseUrl}${allPostsApi}?_author=true`

function renderPosts(posts) {
  const postsContainer = document.querySelector('.all-posts_card-container');
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const postElement = createCardAllPosts(post);
    postsContainer.appendChild(postElement);
  });
}

function filterPosts(inputText) {
  const filteredPosts = posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(inputText.toLowerCase());
/*     const contentMatch = post.body.toLowerCase().includes(inputText.toLowerCase());
 */    const userMatch = post.author.name.toLowerCase().includes(inputText.toLowerCase());
    return titleMatch || userMatch;
  });

  renderPosts(filteredPosts);
}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function () {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();
console.log(searchTerm);
  filterPosts(searchTerm);
});

async function initialize() {
  try {
    posts = await fetchPostsWithToken(APIURL);
    renderPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
initialize();
