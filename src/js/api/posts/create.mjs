import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

export async function createPost(postData) {
  postData.tags = postData.tags.split(" ");
  const creatPostURL = API_SOCIAL_URL + action;

  const response = await authFetch(creatPostURL, {
    method,
    body: JSON.stringify(postData),
  })
  window.location.replace("/posts/index.html");
   return await response.json();
  
}

