import { search } from "../js/utils/searchFunctionality.js";
import { createProfileId } from "../js/utils/queryParam.js";
import { dynamicH2Change } from "../js/utils/dynamicHeaderChange.js";
import { feedBtnHandler } from "../js/utils/feedBtnHandler.js";
import { changeSearchElements } from "../js/utils/changeSearchElements.js";
import { apiUrls } from "../js/api/constant.js";
import { displayPosts } from "../js/posts/displayPosts.js";
import { displayUserProfile } from "../js/users/displayUsers.js";
import { displayFollowers } from "../js/users/displayUsers.js";

const profileId = createProfileId();
const postBtn = document.getElementById("postsBtn");
const followersBtn = document.getElementById("followersBtn");
const followingBtn = document.getElementById("followingBtn");

postBtn.addEventListener("click", () => {
  const id = postBtn.id;
  feedBtnHandler(displayPosts, apiUrls.profile_Posts_Parameter, id);
});

followersBtn.addEventListener("click", () => {
  const id = followersBtn.id;
  feedBtnHandler(displayFollowers, "followers", id);
});

followingBtn.addEventListener("click", () => {
  const id = followingBtn.id;
  feedBtnHandler(displayFollowers, "following", id);
});

/**
 * Displays the user's profile and their latest posts.
 *
 * This function combines several actions to display a user's profile and their latest posts. It calls the `displayUserProfile` function to render the user's profile information, changes the H2 heading text to include the user's name and indicate the display of their latest posts, and then fetches and displays the user's latest posts.
 *
 * @returns {void}
 *
 * @example
 * // Example usage to display the user's profile and latest posts:
 * displayProfile();
 */
const displayProfile = () => {
  displayUserProfile();
  dynamicH2Change(profileId + "`s latest posts:");
  displayPosts(apiUrls.profile_Posts_Parameter);
  changeSearchElements();
};

displayProfile();
search();
