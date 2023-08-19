import { getProfile, updateProfile } from "../api/profiles/index.mjs";
import { load } from "../storage/index.mjs";

export async function setUpdateProfileListener() {
  const form = document.querySelector("#editProfile");

  if (form) {
    const { name, email } = load("profile");
    form.name.value = name;
    form.email.value = email;

    const button = form.querySelector("button");
    button.disabled = true;

    const profile = await getProfile(name);

    form.banner.value = profile.banner;
    form.avatar.value = profile.avatar;

    button.disabled = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const updatedProfile = Object.fromEntries(formData.entries());

      updatedProfile.name = name; 
      updatedProfile.email = email;
      await updateProfile(updatedProfile);

      localStorage.setItem("profile", JSON.stringify(updatedProfile));
      window.location.href = `/profile/`; 
    });
  }
}

  
