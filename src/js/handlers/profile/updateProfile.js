import { getProfile, updateProfile } from "../../api/profile/index.js";
import { load } from "../../storage/index.js";
import displayMessage from "../../ui/components/displayMessage.js";

export async function setUpdateProfileFormListener() {
    const form = document.querySelector("#editProfileForm");

    if (form) {
        const { name, email } = load("profile");
        form.name.value = name;
        form.email.value = email;

        const profile = await getProfile(name);


        form.banner.value = profile.banner;
        form.avatar.value = profile.avatar;

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries())

            profile.name = name;
            profile.email = email;

            try {
               await updateProfile(profile)
                displayMessage("success", 'You profile was updated!', "#message");
             } catch (error) {
                 displayMessage("danger", error, "#message");
             }
        })
    }
};
