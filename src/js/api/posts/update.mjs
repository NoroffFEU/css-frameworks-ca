import { HOST_API_URL, POSTS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function updatePost(postData) {
  if (!postData.id) {
    throw new Error("To update you need a postID");
  }
  const updatePostURL = `${HOST_API_URL}${POSTS}/${postData.id}`;

  const response = await authFetch(updatePostURL, {
    method: "PUT",
    body: JSON.stringify(postData),
  });
  return await response.json();
}
