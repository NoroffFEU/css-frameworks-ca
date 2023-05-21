import { HOST_API_URL, PROFILES, POSTS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * @description This function sends a GET request to the API endpoint for fetching posts by username.
 */

export async function fetchPostsByUsername(username) {
  const getUserPosts = `${HOST_API_URL}${PROFILES}/${username}${POSTS}`;

  const response = await authFetch(getUserPosts);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

/*export async function fetchPostsByUsername(username) {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/social/profiles/${username}/posts`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}*/
