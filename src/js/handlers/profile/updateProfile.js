import { getProfile, updateProfile } from "../../api/profile/index.js";
import { load } from "../../storage/index.js";

export async function setUpdateProfileFormListener() {
    const form = document.querySelector("#editProfileForm");

    if (form) {
        const { name, email } = load("profile");
        form.name.value = name;
        form.email.value = email;

        const profile = await getProfile(name);


        form.banner.value = profile.banner;
        form.avatar.value = profile.avatar;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries())

            profile.name = name;
            profile.email = email;

            //Send to the API
            updateProfile(profile)
            // window.location.href = "/posts/index.html";
            //  Gives user Feedback on errors


        })
    }
};
