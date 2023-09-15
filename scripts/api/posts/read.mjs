import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * get request to retrieve multiple posts from api
 * @returns {Promise<Object[]>} - returns nothing
 * @throws {Error} - throw error if there is an issue with the request or response.
 */
const action = "/posts";

export async function getPosts() {

  const updatePostURL = `${API_SOCIAL_URL}${action}?_author=true`;
  const response = await authFetch(updatePostURL);
  return await response.json();
}

/**
 * get request to retrieve a single post from api based on id
 * @param {number} id - the id of the post to retrieve
 * @returns {Promise<Object>} - returns post based on id
 * @throws {Error} - error message if id is not provided
 */
export async function getPost(id) {
    if (!id) {
      throw new Error("Get requires a postID");
    }
    const getPostURL = `${API_SOCIAL_URL}${action}/${id}?_author=true`;
    const response = await authFetch(getPostURL)
    return await response.json();
  }