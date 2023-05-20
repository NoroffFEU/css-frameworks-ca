import { getProfile, updateProfile } from "../api/profiles/index.mjs";

import { load } from "../storage/index.mjs";

export async function setUpdateProfileListener() {
  const form = document.querySelector("#editProfile");
  const avatarImg = document.querySelector("#avatarImg");
  const username = document.querySelector("#username");
  const userEmail = document.querySelector("#userEmail");

  if (form) {
    const name = load("name");
    form.name.value = name;

    const button = form.querySelector("button");
    button.disabled = true;

    const profile = await getProfile("profile");
    console.log(profile);

    form.banner.value = profile.banner;
    form.avatar.value = profile.avatar;

    if (!profile.avatar) {
      avatarImg.alt = `No image available`;
    } else {
      avatarImg.src = profile.avatar;
      avatarImg.alt = `Image from ${profile.name}`;
    }

    username.innerText = profile.name;
    userEmail.innerText = profile.email;

    button.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      profile.name = name;
      profile.email = email;

      //Send it to the API
      updateProfile(profile);
    });
  }
}
