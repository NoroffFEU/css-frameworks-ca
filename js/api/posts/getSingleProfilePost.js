import { postsUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";

/**
 * Retrieves a single post for a specific user profile.
 *
 * @param {number} id - The ID of the post to retrieve.
 * @returns {Promise<Object>} The response from the server.
 * @throws {Error} If the user is not logged in or the server response is not ok.
 */

export async function getSingleProfilePost(id) {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to view or modify posts");
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${postsUrl}/${id}`, options);
  console.log(response);
  const results = await response.json();

  if (!response.ok) {
    throw new Error(results.errors[0].message);
  }
  return results;
}
