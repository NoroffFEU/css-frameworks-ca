import { register } from "../api/auth/register.js";

//PROBLEMAS COM IMPORT DISPLAY MESSAGE
function displayMessage(type, message, target) {
    const container = document.querySelector(target);

    container.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;
}

// export function setRegisterFormListener() {
//     const registerForm = document.querySelector("#registerForm");

//     if (registerForm) {
//         registerForm.addEventListener("submit", (event) => {
//             event.preventDefault();

//             const registerForm = event.target;
//             const formData = new FormData(registerForm);
//             const profile = Object.fromEntries(formData.entries())
//             console.log(profile)

//             //Send to the API
//             register(profile)


//         })
//     }
// };

export function setRegisterFormListener() {
    const registerForm = document.querySelector("#registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const registerForm = event.target;
            const formData = new FormData(registerForm);
            const profile = Object.fromEntries(formData.entries())
            console.log(profile)

            try {
                register(profile)
                console.log("Succes");
            } catch (error) {
                displayMessage("danger", error, "#message");
            }
        })
    }
};
