import { API_BASE_URL } from './util.js';


document.addEventListener('DOMContentLoaded', function () {
    

    async function loginUser(url, data) {
        try {
            const postData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            const response = await fetch(url, postData);
            
            if (response.status === 200) {
                const json = await response.json();
    
                if (json.accessToken) {
                    // Store the access token in local storage
                    localStorage.setItem('accessToken', json.accessToken);
                    if (json.name) {
                        // Store the user's name in local storage
                        localStorage.setItem('userName', json.name);
                    }
                    console.log('Login successful');
                    // Redirect to profile page after successful login
                    window.location.href = 'profile/index.html';
                } else {
                    // Handle the case when the response is not as expected
                    handleInvalidResponse('Login failed. Please check your credentials.');
                }
            } else if (response.status === 401) {
                // Handle unauthorized (e.g., invalid credentials)
                handleInvalidResponse('Invalid credentials. Please try again.');
            } else {
                // Handle other HTTP status codes
                handleInvalidResponse('An error occurred. Please try again later.');
            }
        } catch (error) {
            // Handle network or other errors
            handleInvalidResponse('An error occurred. Please try again later.');
            console.error('Error:', error);
        }
    }
    
    function handleInvalidResponse(errorMessage) {
        // Display the error message when login fails or response is invalid
        const errorMessageElement = document.getElementById('login-error-message');
        errorMessageElement.textContent = errorMessage;
        errorMessageElement.classList.remove('d-none');
    }
    
    const loginForm = document.getElementById('login-form');
    const emailField = document.getElementById('exampleInputEmail1');
    const passwordField = document.getElementById('exampleInputPassword1');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = emailField.value;
        const password = passwordField.value;

        const userLogin = {
            email,
            password,
        };

        loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, userLogin);
    });
});
