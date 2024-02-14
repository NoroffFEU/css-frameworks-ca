import { API_SOCIAL_URL } from "../api_constants.mjs";

const form = document.querySelector(".formCollection");

const usernameInput = form.querySelector("#username");
const emailInput = form.querySelector("#email");
const passwordInput = form.querySelector("#password");
const userMessage = document.querySelector(".userInfo");

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


  

    function userInfo() {
        userMessage.innerText = "Profile was successfully created";
        setTimeout(() => {
            userMessage.innerText = " ";
            window.location.href = "/index.html";
        }, 2000);
    }

    function userFailed(error) {
        let errorMessage = "An error has occured.";
        userMessage.innerText = errorMessage;
        setTimeout(() => {
            userMessage.innerText = "";
        }, 2000);
    }


});

