// login.js
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerButton = document.getElementById('register-btn');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Your login logic here
        // ...

        // After successful login, you can redirect to another page if needed.
        // For example, you can redirect to the dashboard page.
        // window.location.href = '/dashboard.html';
    });

    // Add a click event listener to the "Register" button
    registerButton.addEventListener('click', function () {
        // Redirect to the registration page
        window.location.href = '/registration.html';
    });
});
