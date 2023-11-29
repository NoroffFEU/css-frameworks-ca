import { apiBaseUrl } from "./script.mjs";

const postsAPI = "/social/posts";
/**
 * Fetches posts with an access token
 * @param {string} url The URL to fetch posts from.
 * @example
 * const apiUrl = `${apiBaseUrl}${postsAPI}`;
 * fetchPostsWithToken(apiUrl);
 */
async function fetchPostsWithToken(url) {
  try {
    // Getting accessToken from localStorage
    const token = localStorage.getItem("accessToken");
    // Creating an object to include the accessToken in the request headers
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // Fetch a response with the specified URL and the accessToken
    const response = await fetch(url, getData);
    // Parse the response body as JSON
    const json = await response.json();
    // Handle errors that may occur during the fetch operation
  } catch (error) {
    console.log("An error occurred during the fetch operation", error);
  }
}

// Calling the fetchPostsWithToken using the URL provided
fetchPostsWithToken(`${apiBaseUrl}${postsAPI}`);