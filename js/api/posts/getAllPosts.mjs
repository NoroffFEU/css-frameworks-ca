import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";
import { get as getToken } from "../../handler/storage.mjs";

const action = "posts";

export async function getAllPosts() {
  const token = getToken("token");

  if (!token) {
    throw new Error("You must be logged in to continue.");
  }

  const getPostURL = `${BASE_URL}${action}?_author=true`;

  try {
    const response = await fetchToken(getPostURL, { method: "GET" });

    if (!response.ok) {
      throw new Error("Failed to show posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
}
