document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");

    loginForm.classList.add("show");
    registerForm.classList.remove("show");
});

function toggleForm() {
    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");

    loginForm.classList.toggle("show");

    registerForm.classList.toggle("show");
}