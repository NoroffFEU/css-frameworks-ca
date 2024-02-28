import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "POST";

export async function createPost(postData) {
  const createPostURL = API_SOCIAL_URL + action;

  const response = await authFetch(createPostURL, {
    method,
    body: JSON.stringify(postData),
  });
  const post = await response.json();
}
