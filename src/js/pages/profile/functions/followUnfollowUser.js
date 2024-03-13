import { load } from "../../../api/storage/load.js";
import { unfollowProfile } from "../../../api/profile/unfollowProfile.js"
import { followProfile } from "../../../api/profile/followProfile.js"


export async function followUnfollowProfile(profileName, followButton, followers) {

    const ownProfile = load("profile");

    const followerNames = followers.map(follower => follower.name);

    if (followerNames.includes(ownProfile.name)) {
        followButton.textContent = "Unfollow";
        followButton.addEventListener('click', async (e) => {
            e.preventDefault();

            await unfollowProfile(profileName);

            window.location.reload();

        })
    } else {
        followButton.textContent = "Follow";

        followButton.addEventListener('click', async (e) => {
            e.preventDefault();

            await followProfile(profileName);

            window.location.reload();

        })
    }


}