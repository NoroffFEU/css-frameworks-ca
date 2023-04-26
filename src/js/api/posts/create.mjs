import { HOST_API_URL, POSTS } from "../constants.mjs";
import { load } from "../../storage/index.mjs";

export async function createPost(postData) {
  const createPostURL = HOST_API_URL + POSTS;
  const token = load("token");
  const response = await fetch(createPostURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(postData),
  });
}
