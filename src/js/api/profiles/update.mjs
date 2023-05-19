import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

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
}

