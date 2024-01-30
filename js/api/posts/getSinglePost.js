import { postsUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";

export async function getSinglePost(id) {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to view or modify posts");
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${postsUrl}/${id}`, options);
  console.log(response);
  const results = await response.json();

  if (!response.ok) {
    throw new Error(results.errors[0].message);
  }
  return results;
}
