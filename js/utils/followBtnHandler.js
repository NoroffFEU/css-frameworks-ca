import { apiCall } from "../api/api.js";
import { apiUrls } from "../api/constant.js";
import { fetchLocalStorage } from "../localStorage/localStorage.js";
import { createProfileId } from "./queryParam.js";

/**
 * Sets up a follow button handler for a user profile.
 *
 * This function sets up a follow button handler for a user profile. It checks the follow status of the user and adds a click event listener to the button to toggle the follow status when clicked.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * followBtnHandler();
 */
export const followBtnHandler = () => {
  const btn = document.querySelector(".profile-btn");

  if (btn) {
    checkFollowStatus(btn);
    btn.addEventListener("click", async (e) => {
      await toggleFollowStatus(btn);
    });
  }
};

/**
 * Fetches and finds a user's followers based on their profile name.
 *
 * This function fetches the list of users that the authenticated user is following and searches for a specific user with the given profile name within that list. It returns the user object if found, or an empty string if the user is not found among the followers.
 *
 * @param {string} profileName - The profile name of the user to find among followers.
 * @returns {object|string} - The user object if found, or an empty string if not found.
 *
 * @example
 * // Example usage:
 * const profileName = "exampleProfile";
 * const user = await fetchFollowers(profileName);
 * if (user) {
 *   // User is found among the followers.
 * } else {
 *   // User is not found among the followers.
 * }
 */

const fetchFollowers = async (profileName) => {
  const name = fetchLocalStorage("name");

  const { following } = await apiCall(apiUrls.profiles_Url + `/${name}/?_following=true `, "get");

  const foundUser = following.reduce((result, user) => {
    if (user.name === profileName) {
      return user;
    }
    return result;
  }, "");
  return foundUser;
};

/**
 * Toggles the follow status of a user and updates the follow button's text.
 *
 * This function toggles the follow status of a user based on their profile name and updates the text of the follow button accordingly. If the user was not following the profile, it sends a follow request, and if they were following, it sends an unfollow request. After the follow status is updated, it reloads the current page to reflect the changes.
 *
 * @param {HTMLButtonElement} btn - The follow button element to be updated.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const followButton = document.querySelector(".profile-btn");
 * toggleFollowStatus(followButton);
 */
const toggleFollowStatus = async (btn) => {
  const profileName = createProfileId();
  const { name } = await fetchFollowers(profileName);

  if (name) {
    await apiCall(apiUrls.profiles_Url + `/${name}/unfollow`, "put", undefined, "noBody");
    btn.innerText = "Unfollow";
  } else {
    await apiCall(apiUrls.profiles_Url + `/${profileName}/follow`, "put", undefined, "noBody");
    btn.innerText = "Follow";
  }
  window.location.reload();
};

/**
 * Checks and updates the text of a follow button based on the user's follow status.
 *
 * This function checks the follow status of a user and updates the text of the provided follow button accordingly. If the user is following the profile, it sets the button text to "Unfollow," and if not, it sets it to "Follow."
 *
 * @param {HTMLButtonElement} btn - The follow button element to be updated.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const followButton = document.querySelector(".profile-btn");
 * checkFollowStatus(followButton);
 */

const checkFollowStatus = async (btn) => {
  const profileName = createProfileId();
  const name = await fetchFollowers(profileName);
  if (name) {
    btn.innerText = "Unfollow";
  } else {
    btn.innerText = "Follow";
  }
};
