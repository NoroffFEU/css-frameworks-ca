import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";

/**
  *Retrieves the list of profiles from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the profiles.
  
  *Sends a request to retrieve the list of profiles from the server.
  *@type {Response} - The response object returned by the server.

  *Parses the JSON response from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the profiles.
*/
export async function getProfiles() {
  const getProfileUrl = `${API_SOCIAL_URL}${action}`;
  const response = await authFetch(getProfileUrl);
  return await response.json();
};

/**
  *Retrieves a profile with the specified name from the server.
  *@param {string} name - The name of the profile to be retrieved.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the profile.
  *@throws {Error} - If the name parameter is missing or invalid.

  *Sends a request to retrieve a profile from the server.
  *@type {Response} - The response object returned by the server.
          
  *Parses the JSON response from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the profile.
 */
export async function getProfile(name) {
   if (!name) {
      throw new Error("Get requires a name");
      }

   const getProfileUrl = `${API_SOCIAL_URL}${action}/${name}`;
   const response = await authFetch(getProfileUrl);
   return await response.json();
 };