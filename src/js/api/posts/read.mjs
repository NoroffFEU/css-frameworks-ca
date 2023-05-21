import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { load } from "../../storage/index.mjs";

const action = "/posts";
const name = load("name");
const actionProfiles = "/profiles/";

export async function getPosts() {
  const getPostUrl = `${API_SOCIAL_URL}${action}`;
  const response = await authFetch(getPostUrl);
  return await response.json();
}

export async function getPostsUser() {
  const getPostUrl = `${API_SOCIAL_URL}${actionProfiles}${name}${action}`;
  const response = await authFetch(getPostUrl);
  return await response.json();
}

export async function getPost(id) {
   if (!id) {
      throw new Error("Get requires a postID");
      }
   const getPostUrl = `${API_SOCIAL_URL}${action}/${id}`;
   const response = await authFetch(getPostUrl);
   return await response.json();
};