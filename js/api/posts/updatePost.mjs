import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "posts";
const method = "PUT";

/**
 * Updates a post using the provided post data.
 *
 * @param {Object} postData - The data of the post to be updated. Must include an 'id' property.
 * @returns {Promise<Object>} The response from the server as a JSON object.
 *
 * @example
 *
 * const postData = {
 *   id: 1,
 *   title: 'Updated Post',
 *   body: 'This is an updated post.'
 * };
 *
 * updatePost(postData)
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */

export async function updatePost(postData) {
  const updatePostURL = `${BASE_URL}${action}/${postData.id}`;

  console.log("Update Post URL:", updatePostURL);

  const response = await fetchToken(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  });

  return await response.json();
}
