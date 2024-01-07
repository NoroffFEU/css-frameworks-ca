import { registerApi } from "../api/auth/register.mjs";

export function RegisterFormListener() {
    const form = document.querySelector(".formCollection");
    form.addEventListener("submit", (event) => {
        event.preventDefault()

        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries())

        //Send it to the API
        registerApi(profile);

    })
}