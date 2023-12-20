import { fetchWithToken } from "./accessToken.mjs";
import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { createCardElement } from "./createCards.mjs";

// Array to store fetched posts
let posts = [];

// URL to the fetch API
const APIURL = `${apiBaseUrl}${allPostsApi}?_author=true`;

function sortPostsNewest(posts) {
  const sortedArray = posts.sort(function (a, b) {
    const timeA = new Date(a.updated);
    const timeB = new Date(b.updated);
    return timeB - timeA; // Compare timestamps in descending order
  });
  return sortedArray;
}

function sortPostsOldest(posts) {
  const sortedArray = posts.sort(function (a, b) {
    const timeA = new Date(a.updated);
    const timeB = new Date(b.updated);
    return timeA - timeB; // Compare timestamps in ascending order
  });
  return sortedArray;
}

const sortButtonsContainer = document.querySelector("#sort-buttons");

sortButtonsContainer.addEventListener("click", function (event) {
  if (event.target.id === "newest") {
    const sortedArray = sortPostsNewest(posts);
    createCardElement(sortedArray);
  } else if (event.target.id === "oldest") {
    const sortedArray = sortPostsOldest(posts);
    createCardElement(sortedArray);
  }
});

const initializeSortPosts = async () => {
  try {
    // Fetch posts from the API
    posts = await fetchWithToken(APIURL);
    // Render the fetched posts
    createCardElement(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// Call the initialize function to start the app
initializeSortPosts();
