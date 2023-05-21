import { updateProfile } from "../api/profiles/index.mjs";
import { load } from "../storage/index.mjs";

/**
  *Sets the update profile form listener to handle form submission for updating a user's profile.
 */
export async function setUpdateProfileListener() {
  const form = document.querySelector("#editProfile");
  const avatarImg = document.querySelector("#avatarImg");
  const username = document.querySelector("#username");
  const userEmail = document.querySelector("#userEmail");

  if (form) {
    const profileData = await load("profile");
    form.name.value = profileData.name;

    username.innerText = profileData.name;
    userEmail.innerText = profileData.email;

    const button = form.querySelector("button");
    button.disabled = true;

    form.banner.value = profileData.banner;
    form.avatar.value = profileData.avatar;
    form.email.value = profileData.email;

    if (!profileData.avatar) {
      avatarImg.alt = `No image available`;
    } else {
      avatarImg.src = profileData.avatar;
      avatarImg.alt = `Image from ${profileData.name}`;
    }

    button.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      console.log(form);
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());
      profile.name = profileData.name;
      profile.email = profileData.email;

      //Send the updated profile data to the API
      updateProfile(profile);
    });
  }
};
