import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs"

/**
 * get request to retrieve multiple profiles
 * @returns {Promise<Object[]>} - retrieve array of profiles
 */
const action = "/profiles";

export async function getProfiles() {
  const updateProfileURL = `${API_SOCIAL_URL}${action}`;
  
  const response = await authFetch(updateProfileURL)

  return await response.json();
}

/**
 * get request to retrieve a single profile
 * @param {string} name - the name of the profile to retrieve
 * @returns {Promise<Object>} - retrieve profile based on name
 * @throws {Error} - throw error if there is no name provided
 */
export async function getProfile(name) {
  if (!name) {
    throw new Error("Get requires a name");
  }

  const getProfileURL = `${API_SOCIAL_URL}${action}/${name}`;
  
  const response = await authFetch(getProfileURL)

  return await response.json();
}