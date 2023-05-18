import {API_SOCIAL_URL} from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

export async function createPost(postData) {
   const createPostUrl = API_SOCIAL_URL + action;
   console.log(postData);
   const response = await authFetch(createPostUrl, {
      method,
      body: JSON.stringify(postData)
   }) 
   console.log(response);
   return await response.json();
};