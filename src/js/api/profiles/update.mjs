import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

/**
  *Updates a profile with the provided profile data.
  *@param {Object} profileData - The updated data of the profile.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the updated profile.
  *@throws {Error} - If the profile data does not contain a valid name.
    
  *Sends a request to update a profile on the server.
  *@type {Response} - The response object returned by the server.
          
  *Parses the JSON response from the server.
  *@returns {Promise<Object>} - A promise that resolves to the JSON data of the updated profile.
 */
export async function updateProfile(profileData) {
   if (!profileData.name) {
      throw new Error("Update requires a name");
      }
  const updateProfileUrl = `${API_SOCIAL_URL}${action}/${profileData.name}/media`;
  const response = await authFetch(updateProfileUrl, {
    method,
    body: JSON.stringify(profileData),
  });
  return await response.json();
};

