import { HOST_API_URL, POSTS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * @description
 * deletes a singel post with an ID
 * if the post dont have an id it will throw an error
 */

export async function removePost(id) {
  if (!id) {
    throw new Error("To delete you need a postID");
  }
  const updatePostURL = `${HOST_API_URL}${POSTS}/${id}`;

  const response = await authFetch(updatePostURL, {
    method: "delete",
  });
  return await response.json();
}
