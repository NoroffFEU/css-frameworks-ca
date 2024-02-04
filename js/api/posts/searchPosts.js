import { postsUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";

export async function searchPosts(tag) {
  const token = getToken();
  const searchUrl = `${postsUrl}?_tag=${tag}`;
  const response = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if (response.ok) {
    if (json.length === 0) {
      throw new Error("No posts found with the provided tag.");
    }
    return json;
  }
}
