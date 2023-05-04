import { register } from "../api/auth/register.mjs";

export function setRegisterFormListener() {
    const registerForm = document.querySelector("#registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();
    
            const registerForm = event.target;
            const formData = new FormData(registerForm);
            const profile = Object.fromEntries(formData.entries())
            console.log(profile)
    
            //Send to the API
            register(profile)
    
    
        })
    }
};