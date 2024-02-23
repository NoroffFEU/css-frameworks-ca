import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "posts";

export async function searchPosts(tag) {
  const url = `${BASE_URL}${action}?_tag=${tag}`;

  const response = await fetchToken(url);

  const result = await response.json();

  if (!response.ok) {
    if (result.length === 0)
      throw new Error(`Please try again. ${result.errors[0].message}.`);
  }
  return result;
}
