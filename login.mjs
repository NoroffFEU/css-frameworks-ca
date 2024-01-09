import { API_SOCIAL_URL } from "./js/api/api_constants.mjs";


const form = document.querySelector(".formLogin");

const emailInput = form.querySelector("#email");
const passwordInput = form.querySelector("#password");

// Function to gather form data and return an object
function getFormData() {
    const email = emailInput.value;
    const password = passwordInput.value;

    return {
        email,
        password,
    };
}

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
                localStorage.setItem("accessToken", accessToken)
                localStorage.setItem("name", profileName);
                userLoggedIn.innerText = "You've successfully logged in.";
                setTimeout(() => {
                    userLoggedIn.innerText = " ";
                    window.location.href = "/profile/home";
                }, 3000)
            }

        })
        .catch(error => console.error("Error:", error));
});
