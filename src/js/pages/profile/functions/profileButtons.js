import { load } from "../../../api/storage/load.js";
import { updateProfileData } from "./editProfileData.js";
import { followUnfollowProfile } from "./followUnfollowUser.js";

export async function profileButtons(profileName, followers) {
    const savedProfileName = load("profile").name;

    const profileBtn1 = document.getElementById('editFollowBtn');
    const profileBtn2 = document.getElementById('friendPostBtn');

    if (savedProfileName === profileName) {
        updateProfileData(profileName, profileBtn1)

        profileBtn2.textContent = 'New Post';
    } else {
        followUnfollowProfile(profileName, profileBtn1, followers)

        profileBtn2.textContent = 'Add as friend';
    }
}