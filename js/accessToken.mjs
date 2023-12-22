// Getting accessToken from localStorage
export const token = localStorage.getItem("accessToken");

// Creating an object to include the accessToken in the request headers
export const getData = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

/**
 * Fetches posts with an access token
 * @param {string} url The URL to fetch posts from.
 * @example
 * const apiUrl = `${apiBaseUrl}${postsAPI}`;
 * fetchWithToken(apiUrl);
 */
export const fetchWithToken = async (url, options = getData) => {
  try {
    // Fetch a response with the specified URL and the accessToken
    const response = await fetch(url, options);

    // Parse the response body as JSON
    const json = await response.json();

    // Handle errors that may occur during the fetch operation
    return json;
  } catch (error) {
    throw new Error("An error occurred during the fetch operation", error);
  }
};
