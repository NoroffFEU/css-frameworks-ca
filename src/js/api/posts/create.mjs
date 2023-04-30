import { HOST_API_URL, POSTS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function createPost(postData) {
  const createPostURL = HOST_API_URL + POSTS;

  const response = await authFetch(createPostURL, {
    method: "Post",
    body: JSON.stringify(postData),
  });
  return await response.json();
}
