import { register } from "../api/auth/register.mjs";


export function SetRegisterFormListener(){
    const form = document.querySelector("#registerForm");

    form.addEventListener("submit", (event) =>{
        event.preventDefault()
        const form = event.target;

        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries())
        console.log("works!")
        const action = form.action;
        const method = form.method;

        register(profile, action, method)

    })
};