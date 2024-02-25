import { API_SOCIAL_URL } from "../api_constants.mjs";

const form = document.querySelector(".formCollection");

const usernameInput = form.querySelector("#username");
const emailInput = form.querySelector("#email");
const passwordInput = form.querySelector("#password");
const userMessage = document.querySelector(".userInfo");

/**
 * This is a function that takes the users name, email and password input.
 * @returns {Object} Returns an object with the user name, email and password.
 */

function getFormData() {
    const name = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    return {
        name,
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

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = getFormData();

    const API_REGISTER = `${API_SOCIAL_URL}/auth/register`;

    try {
        const response = await fetch(API_REGISTER, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (typeof json === "object" && json.hasOwnProperty('id')) {
            userInfo();
        } else {
            userFailed();
        }
    } catch (error) {
        console.log(error);
    }


    /**
     * This function displays a message to the user that the profile was successfully created and then redirects them to the login page.
     * @function userinfo
     */

    function userInfo() {
        userMessage.innerText = "Profile was successfully created";
        setTimeout(() => {
            userMessage.innerText = " ";
            window.location.href = "/index.html";
        }, 2000);
    }

    /**
 * This function displays a message to the user that an error has occured during the profile creation.
 * 
 * @function userFailed
 * @param {String} error Display error message to user.
 */

    function userFailed(error) {
        let errorMessage = "An error has occured.";
        userMessage.innerText = errorMessage;
        setTimeout(() => {
            userMessage.innerText = "";
        }, 2000);
    }


});
