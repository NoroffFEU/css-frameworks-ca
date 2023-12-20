import { apiBaseUrl, profileUrl } from "./variables.mjs"; 
import { fetchWithToken } from "./accessToken.mjs";

const user = JSON.parse(localStorage.getItem("userProfile"))

async function fetchUserProfile() {
  return await fetchWithToken(`${apiBaseUrl}${profileUrl}${user.name}?_posts=true`);
}

const userAvatarContainer = document.querySelector("#userAvatar");
const userNameContainer = document.querySelector("#userName");

const displayUserName = async () => {
  try {
    const json = await fetchUserProfile();
    userNameContainer.innerText = json.name;
    userAvatarContainer.src = !!json.avatar ? json.avatar : "../images/no_avatar.jpg";
  } catch (error) {
    console.log(error);

    // Rethrow the error for external handling, if necessary
    throw new Error(error);
  } 
}
// Initial call to display the single post card
displayUserName();



