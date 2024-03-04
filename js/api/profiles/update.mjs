import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

/**
 * Updates the profile with the specified name.
 * @param {string} name - The name of the profile to update.
 * @param {Object} profileData - The data to update the profile with.
 * @returns {Promise<Object>} - A promise resolving to the updated profile object.
 */

export async function updateProfile(name, profileData) {
  const updateProfileURL = `${API_SOCIAL_URL}${action}/${name}/media`;

  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });

  return await response.json();
}
