import { profileURL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

export async function searchPosts(tag) {
  const url = `${profileURL}?_tag=${tag}`;

  const response = await fetchToken(url);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Please try again. ${result.errors[0].message}.`);
  }
  return result;
}
