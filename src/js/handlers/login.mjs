import { login } from "../api/auth/login.mjs";

/** Login form
 **/
export function setLoginFormListener() {
    const form = document.querySelector("#loginForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries());

            login(profile).then(() => {
                window.location.href = "/posts/index.html";
            }).catch(error => {
                console.error("error while login in", error);
            });
        });
    }
}