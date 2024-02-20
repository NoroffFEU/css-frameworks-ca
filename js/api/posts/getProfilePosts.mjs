import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

export async function getProfilePosts(name) {
  const getPostURL = `${BASE_URL}profiles/${name}/posts?_author=true`;

  const response = await fetchToken(getPostURL);

  if (!response.ok) {
    throw new Error(`You must be logged in to continue. ${response.status}`);
  }

  const posts = await response.json();
  return posts;
}
