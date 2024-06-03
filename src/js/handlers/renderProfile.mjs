import { getMyProfile, getProfile } from "../api/profile/get.mjs";
import * as templates from "../templates/index.mjs";

export async function renderMyProfile() {
    try {
        const profileData = await getMyProfile();
        const container = document.querySelector("#myProfile");

        const profileContainer = templates.profileTemplate(profileData);
        container.innerHTML = "";
        container.append(profileContainer);
      
        //POSTS BY PROFILE
        const myPostsContainer = document.querySelector("#myProfilePosts");
        const myPosts = profileData.posts;
        myPostsContainer.innerHTML = "";

        myPosts.forEach(postData => {
        const postCardElement = templates.profilePostCard(postData, profileData);
        myPostsContainer.append(postCardElement);
        });   
    } catch (error) {
        console.error("Failed to load profile:", error)
    }
}

export async function renderProfile() {
    try {
        const url = new URL(location.href);
        let name = url.searchParams.get("name");

        const profileData = await getProfile(name);
        const container = document.querySelector("#profile");

        const profileContainer = templates.profileTemplate(profileData);
        container.innerHTML = "";
        container.append(profileContainer);
      
        //POSTS BY PROFILE
        const postsContainer = document.querySelector("#profilePosts");
        const myPosts = profileData.posts;
        postsContainer.innerHTML = "";

        myPosts.forEach(postData => {
        const postCardElement = templates.profilePostCard(postData, profileData);
        postsContainer.append(postCardElement);
        });   
    } catch (error) {
        console.error("Failed to load profile:", error)
    }
}
  
  