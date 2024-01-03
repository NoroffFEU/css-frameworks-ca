import { validate, invalidate, empty } from "./functions/validationFunctions.js";
import { API_URL } from "./api/constants.js";

// new user signup
// signup name validation
const nameSignup = document.getElementById("name");

nameSignup.addEventListener("input", (e) => {
    const nameValue = e.target.value;

    (nameValue.length >= 8 && nameValue.length <= 40)
        ? validate(nameSignup)
        : invalidate(nameSignup);

    if (!nameValue) empty(nameSignup);
})

// signup email validation
const emailSignup = document.getElementById("email");

emailSignup.addEventListener("input", (e) => {
    const emailValue = e.target.value;
    const regEx = /^[\w\-.]+@(stud\.)?noroff\.no$/gm;
    // /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    (regEx.test(emailValue))
        ? validate(emailSignup)
        : invalidate(emailSignup)
    
    if (!emailValue) empty(emailSignup);
})

// signup password validation
const passwordSignup = document.getElementById("password");

passwordSignup.addEventListener("input", (e) => {
    const passwordValue = e.target.value;

    (passwordValue.length >= 8)
        ? validate(passwordSignup)
        : invalidate(passwordSignup)

    if (!passwordValue) empty(passwordSignup);
})

// already a user login
// email validation for user
const emailInput = document.getElementById("emailUser");

emailInput.addEventListener("input", (e) => {
    const email = e.target.value;
    const requiredEmail = "user@stud.noroff.com";

    email === requiredEmail
        ? validate(emailInput)
        : invalidate(emailInput);

    if (!email) empty(emailInput);
})

// password validation for user
const passwordInput = document.getElementById("passwordUser");

passwordInput.addEventListener("input", (e) => {
	const password = e.target.value;
	const requiredPassword = "password";

	password === requiredPassword
		? validate(passwordInput)
		: invalidate(passwordInput);

	if (!password) empty(passwordInput);
});


// register new user
const form = document.querySelector("#registration-form");
const actionURL = new URL(form.action);
const registerURL = `${API_URL}${actionURL.pathname}`;
console.log(registerURL)

async function registerUser(profile) {
    const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(profile)
    })
    const result = await response.json();
    window.location.href = "../profile";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const profileData = new FormData(form);
    const profile = Object.fromEntries(profileData.entries());
    registerUser(profile)
})