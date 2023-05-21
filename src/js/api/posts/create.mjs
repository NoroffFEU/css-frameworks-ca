import {API_SOCIAL_URL} from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

/**
   *Creates a new post with the provided post data.
   *@param {Object} postData - The data of the post to be created.

   *@returns {Promise<Object>} - A promise that resolves to the JSON data of the newly created post.
   *export async function createPost(postData) {
      const createPostUrl = API_SOCIAL_URL + action;
  
   *Sends a request to create a new post to the server.
   *@type {Response} - The response object returned by the server.
   *const response = await authFetch(createPostUrl, {
          method,
          body: JSON.stringify(postData)
          });
  
   *Parses the JSON response from the server.
   *@returns {Promise<Object>} - A promise that resolves to the JSON data of the newly created post.
   *return await response.json();
   };
 */

export async function createPost(postData) {
   const createPostUrl = API_SOCIAL_URL + action;
   const response = await authFetch(createPostUrl, {
      method,
      body: JSON.stringify(postData)
   }) 
   return await response.json();
};