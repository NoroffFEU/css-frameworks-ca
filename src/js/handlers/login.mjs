import { login } from "../api/auth/login.mjs";

export function setLoginFormListener () {
    const loginForm = document.querySelector("#loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
    
            const loginForm = event.target;
            const formData = new FormData(loginForm);
            const profile = Object.fromEntries(formData.entries())
            console.log(profile)
    
            //Send to the API
            login(profile)
    
    
        })
    }
};