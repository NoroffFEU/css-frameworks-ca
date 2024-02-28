import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "PUT";

export async function updatePost(title, body, media, id) {
  if (!id) {
    throw new Error("Update requires a postID");
  }

  const postData = {
    title: title,
    body: body,
    media: media,
    id: id,
  };

  const updatePostURL = `${API_SOCIAL_URL}${action}/${id}`;

  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  });

  return await response.json();
}
