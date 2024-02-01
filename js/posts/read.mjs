
import { BASE_URL } from "../api/api.mjs";
import { fetchToken } from "../api/fetchToken.mjs";

const action = "posts";

export async function getPosts() {
  const getPostURL = `${BASE_URL}${action}`;

  const response = await fetchToken(getPostURL)
  
  return await response.json();
}

export async function getPost(id) {
  const getPostURL = `${BASE_URL}${action}/${id}`;

  const response = await fetchToken(getPostURL)
  
  return await response.json();
}
