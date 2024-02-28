import { getProfile, updateProfile } from "../api/profiles/index.mjs";
import { load, save } from "../storage/index.mjs";
import { showMessage } from "../utils/messages.mjs";

export async function setUpdateProfileListener() {
  const form = document.querySelector("#editProfile");

  if (form) {
    const { name, email } = load("profile");

    form.name.value = name;
    form.email.value = email;

    const button = form.querySelector("button");
    button.disabled = true;


    try {
      const profile = await getProfile(name);

      form.banner.value = profile.banner;
      form.avatar.value = profile.avatar;


      button.disabled = false;

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const mediaData = Object.fromEntries(formData.entries());

 

        // Send media update to the API
        await updateProfile(name, mediaData);

        // Update the saved profile in local storage with only the media-related data
        const savedProfile = load("profile") || {};
        const updatedProfile = { ...savedProfile, ...mediaData };
        save("profile", updatedProfile);
        showMessage("Profile updated successfully!", "success");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
        
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }
}


document.addEventListener("DOMContentLoaded", () => {
  // Call the setUpdateProfileListener function when DOM content is loaded
  setUpdateProfileListener();
});


