import { API_BASE_URL } from "./routes.mjs";
//const API_BASE_URL = `https://api.noroff.dev`;


function saveUserData(accessToken) {
    localStorage.setItem('accessToken', accessToken);
  
}

async function loginUser(API_BASE_URL, data) {
    try{
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

            const accessToken = json.accessToken;

            saveUserData(accessToken);

            window.location.href = '/Profile/index.html';
        } else {
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = 'Wrong email or password, please try again.';
        }
        return json;
    } catch (error) {

    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('emailLogIn');
        const passwordInput = document.getElementById('passwordLoggIn');

        const { name, email, password} = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        };

        await loginUser (`${API_BASE_URL}/auth/login`, { name, email, password});
    });
});