import { getToken } from "../../utils/helpers/token.js";
import { postsUrl } from "../../constants/api.js";

export async function updatePost(post) {
  const token = getToken();

  const { id } = post;
  delete post.id;

  if (!token) {
    throw new Error("Only author can modify posts");
  }

  const options = {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${postsUrl}/${id}`;
  const response = await fetch(url, options);

  const json = await response.json();

  if (response.ok) {
    return json;
  }
  throw new Error(json.errors[0].message);
}
