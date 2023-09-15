import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs"

/**
 * put request to update profile media data
 * @param {Object} profileData - contains all the data of the profile
 * @param {string} profileData.name - profile name
 * @param {string} profileData.media - profile media url (banner and avatar)
 * @returns {Promise<Object>} - returns nothing
 * @throws {Error} - if no name is found, throw error
 */
const action = "/profiles";
const method = "put";

export async function updateProfile(profileData) {
  if (!profileData.name) {
    throw new Error("Update requires a name");
  }

  const updateProfileURL = `${API_SOCIAL_URL}${action}/${profileData.name}/media`;
  
  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(profileData)
  })

  return await response.json();
}