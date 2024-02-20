import { API_SOCIAL_URL } from "../api_constants.mjs";

/**
 * Getting the login form, email and password input and initializing them into the variables.
 */
const form = document.querySelector(".formLogin");
const emailInput = form.querySelector("#email");
const passwordInput = form.querySelector("#password");

/**
 * Retrieves the email and password from the input fields.
 * 
 * @returns {Object} An object containing the user's email and password.
 */
function getFormData() {
    const email = emailInput.value;
    const password = passwordInput.value;

    return {
        email,
        password,
    };
}

/**
 * This is the event listener for the login form. The .preventDefault() prevents the submit buttons default behaviour when clicked upon.
 * If successful, it'll send the user to the home section. 
 * 
 * @param {Event} e Submit event object.
 */

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = getFormData();

    const API_LOGIN = `${API_SOCIAL_URL}/auth/login`;

    const userLoggedIn = document.querySelector(".userLoggedIn");

    fetch(API_LOGIN, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (typeof data === "object" && data.hasOwnProperty("accessToken")) {
                const accessToken = data.accessToken;
                const profileName = data.name;
                const profilePicture = data.avatar;
                localStorage.setItem("accessToken", accessToken)
                localStorage.setItem("name", profileName);
                    window.location.href = "/profile/home";
            }

        })
        .catch(error => console.error("Error:", error));
});