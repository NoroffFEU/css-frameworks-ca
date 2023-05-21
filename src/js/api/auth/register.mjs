import { API_SOCIAL_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";

/**
  *Registers a user with the provided profile information.
  *@param {Object} profile - The user's profile data.
  *@returns {Promise<Object>} - A promise that resolves to the user data returned from the registration API.
 
  *Sends a registration request to the server.
  *@type {Response} - The response object returned by the server.
      
  *Parses the JSON response from the server.
  *@type {Object} - The JSON data returned by the server.
 
  *Displays an alert message with the name of the newly created account.
  *@param {string} result.name - The name of the user who created the account.
     
  *Redirects the user to the home page.
  *@type {string} - The URL of the home page. 
 */

export async function register(profile) {
  const registerUrl = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(registerUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });
  const result = await response.json();
  
  alert(`${result.name} created account`);
  location.href = "/";
  
  return result;
};
