import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { load } from "../../storage/index.mjs";

const action = "/posts";
const name = load("name");
const actionProfiles = "/profiles/";


/**
  *Retrieves the list of posts from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the posts.

  *Sends a request to retrieve the list of posts from the server.
  *@type {Response} - The response object returned by the server.
 
  *Parses the JSON response from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the posts.
 */
export async function getPosts() {
  const getPostUrl = `${API_SOCIAL_URL}${action}`;
  const response = await authFetch(getPostUrl);
  return await response.json();
}

/**
  *Retrieves the list of posts by the current user from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the user's posts.
   
  *Sends a request to retrieve the list of posts by the current user from the server.
  *@type {Response} - The response object returned by the server.

  *Parses the JSON response from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the user's posts.
 */
export async function getPostsUser() {
  const getPostUrl = `${API_SOCIAL_URL}${actionProfiles}${name}${action}`;
  const response = await authFetch(getPostUrl);
  return await response.json();
}

/**
  *Retrieves a post with the specified ID from the server.
  *@param {string} id - The ID of the post to be retrieved.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the post.
  *@throws {Error} - If the ID parameter is missing or invalid.
  
  *Sends a request to retrieve a post from the server.
  *@type {Response} - The response object returned by the server.
  
  *Parses the JSON response from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the post.
 */
export async function getPost(id) {
   if (!id) {
      throw new Error("Get requires a postID");
      }
   const getPostUrl = `${API_SOCIAL_URL}${action}/${id}`;
   const response = await authFetch(getPostUrl);
   return await response.json();
};