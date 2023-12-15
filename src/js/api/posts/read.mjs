import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "get";


export async function getPosts() {
  const getPostsURL = `${API_SOCIAL_URL}${action}?_author=true`;
  
  const response = await authFetch(getPostsURL);

  return await response.json();
}

export async function getPost(id) {
  if (!id) {
    throw new Error("Get requires a postID");
  }
  const getPostURL = `${API_SOCIAL_URL}${action}/${id}`;
  const response = await authFetch(getPostURL);

  return await response.json();
}