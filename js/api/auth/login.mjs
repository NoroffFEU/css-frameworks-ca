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
 * Event listener for the login form. Prevents the default form submission behavior.
 * If successful, redirects the user to the home section. 
 * 
 * @param {Event} e Submit event object.
 */
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = getFormData();

    const API_LOGIN = `${API_SOCIAL_URL}/auth/login`;

    try {
        const response = await fetch(API_LOGIN, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        console.log(data);

        if (typeof data === "object" && data.hasOwnProperty("accessToken")) {
            const accessToken = data.accessToken;
            const profileName = data.name;
            const profilePicture = data.avatar;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("name", profileName);
            window.location.href = "/profile/feed";
        } else {
            const errorMessage = data.errors[0].message;
            const errorElement = document.querySelector(".error-message");
            if (errorElement) {
                errorElement.innerText = errorMessage;
            }
        }
    } catch (error) {
        console.error("Error:", error);
        const errorElement = document.querySelector(".error-message");
        if (errorElement) {
            errorElement.innerText = "An error occurred while logging in. Please try again later.";
        }
    }
});



