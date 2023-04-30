export async function updatePost(id) {}

import { HOST_API_URL, POSTS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function updatePost(postData) {
  const createPostURL = `${HOST_API_URL}${POSTS}/${postData.id}`;

  const response = await authFetch(createPostURL, {
    method: "Put",
    body: JSON.stringify(postData),
  });
  return await response.json();
}
