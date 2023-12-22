import { apiBaseUrl, profileUrl } from "./variables.mjs";
import { fetchWithToken } from "./accessToken.mjs";

const user = JSON.parse(localStorage.getItem("userProfile"));

const fetchUserProfile = async () => {
  return await fetchWithToken(`${apiBaseUrl}${profileUrl}${user.name}?_posts=true`);
};

const userAvatarContainer = document.querySelector("#userAvatar");
const userNameContainer = document.querySelector("#userName");

const displayUserName = async () => {
  try {
    const json = await fetchUserProfile();
    userNameContainer.innerText = json.name;
    userAvatarContainer.src = !!json.avatar ? json.avatar : "../images/no_avatar.jpg";
  } catch (error) {
    throw new Error(error);
  }
};
// Initial call to display the single post card
displayUserName();
