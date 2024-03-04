import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";

const action = "/profiles";
const method = "get";

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
