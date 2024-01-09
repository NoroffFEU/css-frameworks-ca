import { API_SOCIAL_URL } from "./js/api/api_constants.mjs";

const form = document.querySelector(".formCollection");

const usernameInput = form.querySelector("#username");
const emailInput = form.querySelector("#email");
const passwordInput = form.querySelector("#password");

// Function to gather form data and return an object
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

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = getFormData();

    const API_REGISTER = `${API_SOCIAL_URL}/auth/register`;

    fetch(API_REGISTER, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (typeof json === "object" && json.hasOwnProperty('id')) {
                userInfo();
            }
        })
        .catch(error => {
            console.error("Error:", error);

        });

    const userMessage = document.querySelector(".userInfo");

    function userInfo() {
        userMessage.innerText = "Profile was successfully created.";
        setTimeout(() => {
            userMessage.innerText = " ";
            window.location.href = "index.html";
        }, 3000);
    }
});
