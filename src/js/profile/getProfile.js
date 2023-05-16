import { API_SOCIAL_URL } from "../api/constants.js";
import { authFetch } from "../api/authFetch.js";

const action = "/profiles";
const profileInfo = "?_posts=true&_author=true&_following=true&_followers=true";

// export async function getProfiles() {
//     const updateProfileUrl = `${API_SOCIAL_URL}${action}`;

//     const response = await authFetch(updateProfileUrl)

//     return await response.json();
// }

export async function getProfile(name) {
    if (!name) {
        throw new Error("Get requires a name");
    }
    const getProfileUrl = `${API_SOCIAL_URL}${action}/${name}${profileInfo}`;

    const response = await authFetch(getProfileUrl)
    return await response.json();
    // const json = await response.json();
}

// Get user from url param
// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// let name = params.get("name");
// const accessToken = localStorage.getItem("token");

// const followBtn = document.querySelector(".follow");
// const profilePicture = document.querySelector(".profile-picture");
// const userName = localStorage.getItem("name");

// const profileInfoUrl = `${API_SOCIAL_URL}/profiles/${name}?_posts=true&_author=true&_following=true&_followers=true`;
// const userInfo = localStorage.getItem("profile")
// console.log(userInfo);
// const userData = await authFetch (accessToken, profileInfoUrl);
// console.log(userData)

// const profileName = document.querySelector(".profile-name");
// profileName.innerHTML = name;
// if (userName === name) {
//     profilePicture.src = userData.avatar;
// }

// Display follow numbers
// const followersCount = document.querySelector(".followers");
// const followingCount = document.querySelector(".following");
// followersCount.innerHTML = userData._count.followers;
// followingCount.innerHTML = userData._count.following;

