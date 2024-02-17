import { postsUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";

/**
 * Retrieves all posts.
 *
 * @param {string} [sort=""] - The field to sort by.
 * @param {string} [sortOrder="desc"] - The order to sort in. Can be "asc" or "desc".
 * @returns {Promise<Object>} The response from the server.
 * @throws {Error} If the user is not logged in or the server response is not ok.
 */

export async function getAllPosts(sort = "", sortOrder = "desc") {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to view,edit or delete posts");
  }

  // add this for sorting?????

  // const url = new URL(postsUrl);
  // if (sort) {
  //   url.searchParams.append("sort", sort);
  //   if (sortOrder) {
  //     url.searchParams.append("sortOrder", sortOrder);
  //   }
  // }

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(postsUrl, options);
  console.log(response);
  const results = await response.json();

  if (!response.ok) {
    throw new Error(results.errors[0].message);
  }
  return results;
}
