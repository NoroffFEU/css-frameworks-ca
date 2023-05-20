import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";

export async function getProfiles() {
  const getProfileUrl = `${API_SOCIAL_URL}${action}`;
  console.log(getProfileUrl);
  const response = await authFetch(getProfileUrl);
  console.log(response);
  return await response.json();
};

export async function getProfile(name) {
   if (!name) {
      throw new Error("Get requires a name");
      }

   const getProfileUrl = `${API_SOCIAL_URL}${action}/${name}`;
   const response = await authFetch(getProfileUrl);
   return await response.json();
 };