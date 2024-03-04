import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";

const action = "/profiles";
const method = "get";

/**
 * Retrieves all profiles.
 * @returns {Promise<Object>} - A promise resolving to the list of profiles.
 * @throws {Error} - Throws an error if fetching profiles fails.
 */
export async function getProfiles() {
  try {
    showLoader();
    const updateProfileURL = `${API_SOCIAL_URL}${action}`;

    const response = await authFetch(updateProfileURL);

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
  } finally {
    hideLoader();
  }
}

/**
 * Retrieves a profile by name.
 * @param {string} [name=load("profile").name] - The name of the profile to retrieve.
 * @returns {Promise<Object>} - A promise resolving to the profile object.
 * @throws {Error} - Throws an error if fetching the profile fails.
 */
export async function getProfile(name = load("profile").name) {
  try {
    showLoader();
    if (!name) {
      throw new Error("Get requires a name");
    }
    const getProfileURL = `${API_SOCIAL_URL}${action}/${name}`;
    const response = await authFetch(getProfileURL);
    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  } finally {
    hideLoader();
  }
}
