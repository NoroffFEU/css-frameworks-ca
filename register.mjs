import { API_REGISTER } from "./APIs.mjs";

const form = document.querySelector(".formCollection");

const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

document.addEventListener("register", function (event) {
    event.preventDefault();
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    fetch(API_REGISTER, {
        method: "post",
        body: JSON.stringify({
            username,
            email,
            password,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.error("Error:", error));
});

