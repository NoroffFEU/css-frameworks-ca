import { register } from "../../api/auth/register.js";
import displayMessage from "../../ui/components/displayMessage.js" ;

export function setRegisterFormListener() {
    const registerForm = document.querySelector("#registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const registerForm = event.target;
            const formData = new FormData(registerForm);
            const profile = Object.fromEntries(formData.entries())
           
            try {
                await  register(profile)
                displayMessage("success", 'You are now registered! <a href="/profile/login/" class="text-primary fw-bold">Log in</a> ', "#message");
			} catch (error) {
				displayMessage("danger", error, "#message");
			}
        })
    }
};

