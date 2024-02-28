import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "get";

export async function getProfiles() {
  const updateProfileURL = `${API_SOCIAL_URL}${action}`;

  const response = await authFetch(updateProfileURL);

  return await response.json();
}

export async function getProfile(name = load("profile").name) {
  if (!name) {
    throw new Error("Get requires a name");
  }
  const getProfileURL = `${API_SOCIAL_URL}${action}/${name}`;

  const response = await authFetch(getProfileURL);

  return await response.json();
}
