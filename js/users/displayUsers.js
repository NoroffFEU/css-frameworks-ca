import { apiCall } from "../api/api.js";
import { renderProfile, renderUsers } from "../render/render.js";
import { apiUrls } from "../api/constant.js";
import { editBtn } from "../utils/editBtn.js";
import { createProfileId } from "../utils/queryParam.js";
import { checkResult } from "../users/suggestUsers.js";
import { dynamicH2Change } from "../utils/dynamicHeaderChange.js";
import { changeSearchElements } from "../utils/changeSearchElements.js";
import { followBtnHandler } from "../utils/followBtnHandler.js";
import { toggleLoader } from "../utils/spinner.js";

/**
 * Displays the user's profile information, including the user's profile details, posts, and user interaction buttons.
 *
 * This function fetches the user's profile information from the API, renders the profile details, and sets up user interaction buttons such as editing or following/unfollowing btn based on wether it displays a random user profile, or the logged in users profile .
 *
 * @async
 * @returns {void}
 *
 * @example
 * // Example usage:
 * displayUserProfile();
 */
export const displayUserProfile = async () => {
  try {
    const profile = await apiCall(apiUrls.profile_Parameter, "get");
    renderProfile(profile);
    editBtn();
    followBtnHandler();
  } catch (error) {
    console.log(error);
    alert(`Ups something went wrong, ${error}`);
  }
};

/**
 * Displays a list of users by fetching user data from the API and rendering the user cards.
 *
 * This function fetches user data from the API, and then renders cards with their profiles on the page.
 *
 * @async
 * @returns {void}
 *
 * @example
 * // Example usage:
 * displayUsers();
 */
export const displayUsers = async () => {
  const users = await apiCall(apiUrls.users_Url, "get");
  renderUsers(users);
};

/**
 * Displays a list of a user's followers or users they are following, based on the specified value.
 *
 * This function fetches either the list of users followers, and list of users the user is following. Based on the provided value. It then checks the results, renders the user profiles, and dynamically updates the page with the appropriate title. It also handles the toggling of loader and search elements.
 *
 * @async
 * @param {string} value - A string specifying whether to display "followers" or "following."
 * @returns {void}
 *
 * @example
 * // Example usage:
 *   displayFollowers("followers"); // Display the list of followers
 *   displayFollowers("following"); // Display the list of users being followed
 * }
 */

export const displayFollowers = async (value) => {
  try {
    const profileId = createProfileId();
    const { followers, following } = await apiCall(apiUrls.profile_Parameter, "get");
    if (value === "followers") {
      checkResult(followers, renderUsers, `do not have any  followers yet`);
    } else if (value === "following") {
      checkResult(following, renderUsers, `do not  follow anybody yet`);
    }
    toggleLoader();
    dynamicH2Change(`${profileId}s ${value}:`);
    changeSearchElements();
  } catch (error) {
    console.log(error);
    alert(`Ups something went wrong, ${error}`);
  }
};
