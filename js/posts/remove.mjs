import { BASE_URL } from "../api/api.mjs";
import { fetchToken } from "../api/fetchToken.mjs";

const action = "posts";
const method = "delete";

export async function removePost(id) {
  const removePostURL = `${BASE_URL}${action}/${id}`;

  const response = await fetchToken(removePostURL, {
    method
  })
  
  return await response.json();

  }