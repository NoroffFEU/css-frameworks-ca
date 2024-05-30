import { renderPosts } from "../render/render.js";
import { filterPosts } from "../utils/filterFunctionality.js";
import { apiUrls } from "../api/constant.js";
import { createPosts } from "../render/createHtml/createPosts.js";
import { checkResult } from "../users/suggestUsers.js";
import { apiCall } from "../api/api.js";
import { toggleLoader } from "../utils/spinner.js";

/**
 * Fetches and displays posts from the specified URL.
 *
 * This function fetches posts from the given URL using an  GET request. It then checks the result, renders the posts if available, displays a message if there are no posts and suggest other users the user can befriend,  enables filterFunction and  hides a loader upon completion.
 *
 * @async
 * @param {string} url - The URL to fetch the posts from.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const postsUrl = "https://example.com/posts";
 * displayPosts(postsUrl);
 */
export const displayPosts = async (url) => {
  try {
    const posts = await apiCall(url, "get");
    checkResult(posts, renderPosts, `do not  follow anybody yet`);
    filterPosts(posts);
    toggleLoader();
  } catch (error) {
    console.log(error);
    alert(`an error has occurred: ${error}`);
  }
};
/**
 * Fetches and displays a single post  from the specified URL.
 *
 * This function fetches a  post from the given URL using an  GET request. It renders the post if possible, displays a message if something goes wrong,  and  hides a loader upon completion.
 *
 * @async
 * @param {string} url - The URL to fetch the posts from.
 * @returns {void}
 *
 * @example
 * // Example usage:
 *
 * displayPost(post);
 */
export const displayPost = async () => {
  try {
    const post = await apiCall(apiUrls.post_parameter, "get");
    createPosts(post);
    toggleLoader();
  } catch (error) {
    console.log(error);
    alert(`an error has occurred: ${error}`);
  }
};
