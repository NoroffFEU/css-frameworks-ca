// Old code.... not used anymore - just kept for reference
import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "posts";

export async function getAllPosts() {
  const getPostURL = `${BASE_URL}${action}`;

  const response = await fetchToken(getPostURL);

  return await response.json();
}

// import { BASE_URL } from "../api.mjs";
// import { fetchToken } from "../fetchToken.mjs";

// const action = "posts";

// export async function getPosts() {
//   const token = getToken(); // Obtain authorization token

//   if (!token) {
//     throw new Error("You must be logged in to continue.");
//   }

//   const getPostURL = `${BASE_URL}${action}`;

//   try {
//     const response = await fetchToken(getPostURL, "GET", token);

//     if (!response.ok) {
//       throw new Error("Failed to show posts");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error getting posts:", error);
//     throw error;
//   }
// }
