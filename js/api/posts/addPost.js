import { postsUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";
import { messageForUser } from "../../ui/messageForUser.js";

export async function addPost(postData) {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to create a post");
  }
  if (!postData || Object.keys(postData).length === 0) {
    throw new Error("Post data cannot be empty");
  }

  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("body", postData.body);
  formData.append("media", postData.media);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // should i delete this line??
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData), // should i delete this line??
    // body: formData,
  };

  const response = await fetch(postsUrl, options);
  const results = await response.json();

  if (!response.ok) {
    throw new Error(results.errors[0].message);
    messageForUser("#messageForUser", "Post failed to add", "danger");
  }
  return results;
}
