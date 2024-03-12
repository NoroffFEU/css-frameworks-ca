import { register } from "../api/auth/register.mjs";

/**
 * Registering user and redirecting to the login page.
 */
export function setRegisterFormListener() {
    const form = document.querySelector("#registerForm");
    
    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries());

            try {
                await register(profile);
                
                window.location.href = "/profile/login/index.html";
            } catch (error) {
                console.error("Registration failed:", error);
            }
        });
    }
}