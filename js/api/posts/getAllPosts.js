import { postsUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";

export async function getAllPosts() {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to view,edit or delete posts");
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(postsUrl, options);
  console.log(response);
  const results = await response.json();

  if (!response.ok) {
    throw new Error(results.errors[0].message);
  }
  return results;
}
