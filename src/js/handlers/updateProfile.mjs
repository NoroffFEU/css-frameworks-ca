import { readPost, updatePost } from "../api/posts/index.mjs";
import { load } from "../storage/storage.mjs";


// handles the edit of profiles

export async function SetUpdateProfileFormListener() {
    const form = document.querySelector("#updateProfile");

    const url = new URL(location.href);
    
    const { name, email } = load("profile")

    if (form) {

        const button = form.querySelector("button");
        button.disabled = true;


        const profile = await readprofile(name);

        form.name.value = name;
        form.email.value = email;
        form.banner.value = profile.banner;
        form.avatar.value = profile.avatar;

        button.disabled = false;

        form.addEventListener("submit", (event) =>{
            event.preventDefault()
            const form = event.target;
    
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries())
            
            console.log("works!")
            
    
            updateProfile(profile)
    
        })

    }
    
};