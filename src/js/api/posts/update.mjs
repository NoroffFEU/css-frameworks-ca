import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";

/**
  *Updates a post with the provided post data.
  *@param {Object} postData - The updated data of the post.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the updated post.
  *@throws {Error} - If the post data does not contain a valid ID.
  *export async function updatePost(postData) {
      if (!postData.id) {
      throw new Error("Update requires a postID");
      }
      const updatePostUrl = ${API_SOCIAL_URL}${action}/${postData.id};
  
  *Sends a request to update a post on the server.
  *@type {Response} - The response object returned by the server.
  const response = await authFetch(updatePostUrl, {
          method,
          body: JSON.stringify(postData),
          });

  *Parses the JSON response from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the updated post.
  return await response.json();
  };
  */
export async function updatePost(postData) {
   if (!postData.id) {
      throw new Error("Update requires a postID");
      }
  const updatePostUrl = `${API_SOCIAL_URL}${action}/${postData.id}`;
  const response = await authFetch(updatePostUrl, {
    method,
    body: JSON.stringify(postData),
  });
  return await response.json();
};

