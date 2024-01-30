import { profilesUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";
// https://api.noroff.dev/api/v1/social/profiles/${username}/posts?_author=true&_comments=true&_reactions=true

export async function getProfilePosts(username) {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to view or modify posts");
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      `${profilesUrl}${username}/posts?_author=true&_comments=true&_reactions=true`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching profile posts:", error);
    throw error;
  }
}
