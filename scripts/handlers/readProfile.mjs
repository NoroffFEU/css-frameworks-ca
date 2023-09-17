import { getProfile } from "../api/profiles/index.mjs";
import { load } from "../storage/index.mjs";

export async function setReadProfileListener() {

    const bannerContainer = document.querySelector("#banner-container");
    const profileImage = document.querySelector("#profile-image");
    const profileName = document.querySelector("#profile-name");
    const profileEmail = document.querySelector("#profile-email");

    const { name, email } = load("profile");
    const profile = await getProfile(name);
  
    profileName.textContent = name;
    profileEmail.textContent = email;
    profileImage.src = profile.avatar;

    bannerContainer.style.backgroundImage = `url(${profile.banner})`;
    bannerContainer.style.backgroundRepeat = "no-repeat";
    bannerContainer.style.backgroundSize = "cover";
}
