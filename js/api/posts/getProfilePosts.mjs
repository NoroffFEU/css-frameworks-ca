import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

/**
 * Fetches all posts of a specific profile from the server.
 *
 * @param {string} name - The name of the profile to fetch posts from.
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 * @throws {Error} If the server response is not ok, throws an error with the appropriate message.
 *
 * @example
 *
 * getProfilePosts('username')
 *   .then(posts => console.log(posts))
 *   .catch(error => console.error(error));
 */

export async function getProfilePosts(name) {
  const getPostURL = `${BASE_URL}profiles/${name}/posts?_author=true`;

  const response = await fetchToken(getPostURL);

  if (!response.ok) {
    throw new Error(`You must be logged in to continue. ${response.status}`);
  }

  const posts = await response.json();
  return posts;
}
