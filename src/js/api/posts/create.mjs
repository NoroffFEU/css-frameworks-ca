/* import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/posts";

export async function createPost(postData) {
  postData.tags = postData.tags.split(" ");
  const createPostURL = API_SOCIAL_URL + action;
  const response = await authFetch(createPostURL, {
    method: "post",
    body: JSON.stringify(postData),
  });
  const result = await response.json();
  alert("Your post has created");
  window.location.replace("/posts/index.html" || "/post");
  return result;
}
*/
import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

export async function createPost(postData) {
  const creatPostURL = API_SOCIAL_URL + action;

  const response = await authFetch(creatPostURL, {
    method,
    body: JSON.stringify(postData)
  })

   return await response.json();
  
}

