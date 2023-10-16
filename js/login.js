document.addEventListener('DOMContentLoaded', function () {
    const API_BASE_URL = 'https://api.noroff.dev';

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
            console.log(response);
            const json = await response.json();

            if (json.accessToken) {
                // Store the access token in local storage
                localStorage.setItem('accessToken', json.accessToken);
                if (json.name) {
                    // Store the user's name in local storage
                    localStorage.setItem('userName', json.name);
                }
                console.log('Login successful');
                // Redirect to a dashboard or another page after successful login
                window.location.href = 'profile/index.html';
            } else {
                // Display the error message when login fails
                const errorMessage = document.getElementById('login-error-message');
                errorMessage.textContent = 'Login failed. Please check your credentials.';
                errorMessage.classList.remove('d-none'); // Show the error message
                console.error('Login failed:', json.message);
            }
        } catch (error) {
            // Handle network or other errors
            const errorMessage = document.getElementById('login-error-message');
            errorMessage.textContent = 'An error occurred. Please try again later.';
            errorMessage.classList.remove('d-none'); // Show the error message
            console.error('Error:', error);
        }
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
