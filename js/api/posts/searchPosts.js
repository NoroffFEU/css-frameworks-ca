import { postsUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";

/**
 * Searches for posts with a specific tag.
 *
 * @param {string} tag - The tag to search for.
 * @returns {Promise<Array<Object>>} The posts with the provided tag.
 * @throws {Error} If no posts are found with the provided tag or the server response is not ok.
 */

export async function searchPosts(tag) {
  const token = getToken();
  const searchUrl = `${postsUrl}?_tag=${tag}`;
  const response = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if (response.ok) {
    if (json.length === 0) {
      throw new Error("No posts found with the provided tag.");
    }
    return json;
  }
}
