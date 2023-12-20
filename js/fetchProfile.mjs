import { apiBaseUrl, profileUrl } from "./variables.mjs"; 
import { fetchPostsWithToken } from "./accessToken.mjs";

const user = JSON.parse(localStorage.getItem("userProfile"))

async function fetchUserProfile() {
  return await fetchPostsWithToken(`${apiBaseUrl}${profileUrl}${user.name}?_posts=true`);
}

const userNameContainer = document.querySelector("#userName");

const displayUserName = async () => {
  try {
    const json = await fetchUserProfile();
    userNameContainer.innerText = json.name;
  } catch (error) {
    console.log(error);

    // Rethrow the error for external handling, if necessary
    throw new Error(error);
  } 
}
// Initial call to display the single post card
displayUserName();



