import { HOST_API_URL, POSTS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * @description
 * Creates a new post with the provided post data.
 */

export async function createPost(postData) {
  const createPostURL = HOST_API_URL + POSTS;

  const response = await authFetch(createPostURL, {
    method: "POST",
    body: JSON.stringify(postData),
  });
  return await response.json();
}
