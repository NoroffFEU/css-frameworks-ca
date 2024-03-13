import { getProfile } from "../../../api/profile/getProfile.js";
import { profileButtons } from "./profileButtons.js";
import { renderPostsByProfile } from "./renderPostsByProfile.js";

export async function renderProfile() {
    try {
        const urlParams = new URLSearchParams(window.location.search)
        const profileName = urlParams.get('name');

        const profileData = await getProfile(profileName);

        const followers = profileData.data.followers;

        document.getElementById('nameContent').textContent = profileData.data.name;
        document.getElementById('avatarSrc').src = profileData.data.avatar.url;
        document.getElementById('postCount').textContent = profileData.data._count.posts;
        document.getElementById('followersCount').textContent = profileData.data._count.followers;
        document.getElementById('followingCount').textContent = profileData.data._count.following;
        
        const profileBio = document.getElementById('bioContent');

        if (profileData.data.bio === null) {
            profileBio.textContent = "This is a short description";
        } else {
            profileBio.textContent = profileData.data.bio;
        }

        renderPostsByProfile(profileName, profileData);

        profileButtons(profileName, followers);
    } catch (error) {
        console.error("Could not render profile, please try again later " + error.message);
    }
}