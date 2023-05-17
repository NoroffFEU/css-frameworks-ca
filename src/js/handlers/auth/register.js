import { register } from "../../api/auth/register.js";
import displayMessage from "../../ui/components/displayMessage.js" ;

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

// export function setRegisterFormListener() {
//     const registerForm = document.querySelector("#registerForm");

//     if (registerForm) {
//         registerForm.addEventListener("submit", async (event) => {
//             event.preventDefault();
//             const registerForm = event.target;
//             const formData = new FormData(registerForm);
//             const profile = Object.fromEntries(formData.entries())
//             console.log(profile)
            
//             // try {
//             //     register(profile)
//             //     window.location.href = "/profile/login";

//             // } catch (error) {

//             //     displayMessage("danger", error, "#message");
//             // }



//         })
//     }
// };
