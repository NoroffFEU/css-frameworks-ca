import { renderPosts } from "../render/render.js";
import { updatePostsSection } from "./updatePostsContainer.js";
import { renderUsers } from "../render/render.js";
import { apiUrls } from "../api/constant.js";
import { apiCall } from "../api/api.js";
import { changeSearchElements } from "./changeSearchElements.js";

const searchForm = document.getElementById("search");
const searchParameter = document.getElementById("searchParameter");
const optionPostsBtn = document.getElementById("option-posts");
const optionUsersBtn = document.getElementById("option-users");

/**
 * Registers an input event listener for the search form to filter either posts or users based on user input.
 *
 * This function adds an input event listener to the search form, allowing users to filter either posts or users based on their input value and the selected search parameter. When the input event is triggered, it determines the search parameter (e.g., "Posts" or "Users") and filters the corresponding data accordingly.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * search();
 */
export const search = () => {
  searchForm.addEventListener("input", () => {
    const value = searchForm.children[0].value;
    const parameter = searchParameter.value;

    if (parameter === "Posts") {
      filterPosts(value);
    } else {
      filterUsers(value);
    }
  });
};

/**
 * Filters and displays posts based on a search value that matches author name, title, or body.
 *
 * This function filters posts based on the provided search value, which can match any of the following: author name, post title, or post body. It performs a case-insensitive search to find posts that contain the search value in any of these fields. The filtered posts are then rendered in the posts section.
 *
 * @param {string} value - The search value to filter posts by.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const searchValue = "example";
 * filterPosts(searchValue);
 */

const filterPosts = async (value) => {
  const posts = await apiCall(apiUrls.posts_Parameter, "get");

  const filteredPosts = posts.filter((post) => {
    return (
      post.author.name.toLowerCase().includes(value.toLowerCase()) ||
      post.title.toLowerCase().includes(value.toLowerCase()) ||
      post.body.toLowerCase().includes(value.toLowerCase())
    );
  });
  updatePostsSection();
  renderPosts(filteredPosts);
};

/**
 * Filters and displays users based on a search value.
 *
 * This function filters users based on the provided search value, specifically targeting user names. It converts the names to lowercase and checks if they start with the specified search value. The filtered users are then rendered in the posts section.
 *
 * @param {string} value - The search value to filter users by.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const searchValue = "john";
 * filterUsers(searchValue);
 */

const filterUsers = async (value) => {
  const users = await apiCall(apiUrls.users_Url, "get");

  const filteredUsers = users.filter(({ name }) => {
    const stringifiedName = name.toString();
    return stringifiedName.toLowerCase().startsWith(value.toLowerCase());
  });

  updatePostsSection();
  renderUsers(filteredUsers);
};

optionPostsBtn.addEventListener("click", () => renderOptions(apiUrls.posts_Parameter, renderPosts));
optionUsersBtn.addEventListener("click", () => renderOptions(apiUrls.users_Url, renderUsers));

/**
 * Fetches data from an API, updates a section, and renders the data using a rendering function.
 *
 * This function makes an API call to the specified URL to fetch data, updates a designated section (e.g., posts), and renders the retrieved data using a provided rendering function. Additionally, it may trigger changes in search-related elements.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {Function} renderFunction - The rendering function to apply to the retrieved data.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const apiUrl = "https://example.com/api/Posts";
 * const renderFunction = renderPosts;
 * renderOptions(apiUrl, renderFunction);
 */
const renderOptions = async (url, renderFunction) => {
  const result = await apiCall(url, "get");
  updatePostsSection();
  renderFunction(result);
  changeSearchElements();
};
