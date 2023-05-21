import { API_SOCIAL_URL } from "../constants.mjs";

const action = "/auth/login";
const method = "post";

/**
  *Logs in a user with the provided profile information.
  *@param {Object} profile - The user's profile data.
  *@returns {Promise<Object>} - A promise that resolves to the user data returned from the login API.
  *@throws {Error} - If the login request fails or the username/password is incorrect.
  
  *Sends a login request to the server.
  *@type {Response} - The response object returned by the server.
  
  * Parses the JSON response from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data returned by the server.
 */

export async function login(profile) {
  const loginUrl = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  if (!response.ok) {
    throw new Error("Either the username or password is incorrect!");
  }
  
  return await response.json();
};
