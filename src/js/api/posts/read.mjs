import { HOST_API_URL, POSTS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function getPosts(tag) {
  let updatePostURL = `${HOST_API_URL}${POSTS}`;

  if (tag) {
    updatePostURL += `?_tag=${tag}&_active=true`;
  }

  const response = await authFetch(updatePostURL);
  return await response.json();
}

export async function getPost(id) {
  if (!id) {
    throw new Error(" To get you need postID");
  }
  const getPostURL = `${HOST_API_URL}${POSTS}/${id}`;
  const response = await authFetch(getPostURL);

  return await response.json();
}
