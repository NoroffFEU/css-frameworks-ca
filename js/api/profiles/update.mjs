import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

export async function updateProfile(ProfileData) {

    if(!profileData.name){
        throw new Error ("update requires a name")
    }
  const updateProfileURL = `${API_SOCIAL_URL}${action}/${profileData.name}`;

  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });
  
  return await response.json();
  
}