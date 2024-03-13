import { login } from "../../api/login.js";
import { registerUser } from "../../api/registerUser.js";
import { load } from "../../api/storage/load.js";
import { validateEmail, validatePassword } from "./functions/formValidation.js";


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registerButton").addEventListener("click", function() {
        document.getElementById("loginCard").style.display = "none";
        document.getElementById("registerCard").style.display = "block";
    });

    document.getElementById("backToLogin").addEventListener("click", function() {
        document.getElementById("loginCard").style.display = "block";
        document.getElementById("registerCard").style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registerForm").addEventListener("submit", async function(event) {
       event.preventDefault();
       
       const username = document.getElementById("registerName").value;
       const email = document.getElementById("registerMail").value;
       const password = document.getElementById("registerPassword").value;

       if (!validateEmail(email)) {
           alert('Please enter a valid email address (@noroff.no or @stud.noroff.no)');
           return;
       }

       if (!validatePassword(password)) {
           alert('Password must be at least 8 characters long and contain at least one number, uppercase letter, and special character.');
           return;
       }

       try {
           const response = await registerUser(username, email, password);

           alert('Registration successful!');
       
       } catch (error) {
           console.error('There was a problem with registration', error.message);
           alert('Registration failed. Please try again or contact Marius');
       }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value

        try {
            const response = await login(email, password);

            console.log('Login successful!', response);
            alert('Login successful!');

            window.location.href = "feed/";
        } catch (error) {
            console.error('There was a problem logging in', error.message);
            alert('Could not login! Please contact Marius')
        }
    });
});

const profile = load("profile");

if (profile) {
    window.location.href = 'feed/';
}