import { getProfile,updateProfile } from "../api/profiles/index.mjs";
import { load } from "../storage/index.mjs";


export async function setUpdateProfileListener() {
  const form = document.querySelector("#editProfile");

  if (form) {
    const {name, email} = load("profile");
    console.log("Profile data:", name, email);
    form.name.value = name;
    form.email.value = email;

    const button = form.querySelector ("button");
    button.disabled = true;

    try{
    const profile = await getProfile(name);
    

    form.banner.value = profile.banner;
    form.avatar.value = profile.avatar;

    button.disabled = false;
    
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      // Send it to the API
      updateProfile(profile);
      
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
}
}
}