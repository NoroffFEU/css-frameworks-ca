import { profilesUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";

/**
 * Retrieves all posts for a specific user profile.
 *
 * @param {string} username - The username of the profile.
 * @returns {Promise<Object>} The response from the server.
 * @throws {Error} If the user is not logged in or the server response is not ok.
 */

export async function getProfilePosts(username) {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to view or modify posts");
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${profilesUrl}${username}/posts?_author=true&_comments=true&_reactions=true`, options);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = await response.json();
  return posts;
}
