import { API_BASE_URL } from "./routes.mjs";
//const API_BASE_URL = `https://api.noroff.dev`;


async function registerUser(API_BASE_URL, data) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(API_BASE_URL, postData);
        const json = await response.json();

        if (response.ok) {
            window.location.href = '/Profile/login/index.html';
        } else {
        }
        return json;
    } catch (error) {

    }
}


document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    registrationForm.addEventListener('submit', async function (event) {
        event.preventDefault();
    
        const nameInput = document.getElementById('name');
        const passwordInput = document.getElementById('password');
    
        const user = {
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        };

        const isValidNoroffEmail = isValidEmail(user.email);

        if (!isValidNoroffEmail) {
            emailError.style.display = 'block';
            return; 
        }
        emailError.style.display = 'none';

        await registerUser(`${API_BASE_URL}/auth/register`, user)
});

function isValidEmail(email) {
    const noroffEmailRegex = /^(.+)@(noroff\.no|stud\.noroff\.no)$/;
    return noroffEmailRegex.test(email);
  }
});