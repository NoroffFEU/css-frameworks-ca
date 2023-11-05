document.addEventListener('DOMContentLoaded', function () {
    const API_BASE_URL = 'https://api.noroff.dev';

    async function registerUser(url, data) {
        try {
            const postData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(url, postData);

            if (response.ok) {
                const json = await response.json();

                // Check the response and handle success or error cases
                if (json.id) {
                    // Registration was successful
                    console.log('Registration successful');
                    registrationMessage.textContent = 'Registration successful';
                    registrationMessage.classList.remove('text-danger');
                    registrationMessage.classList.add('text-success');

                    // Clear input fields
                    emailField.value = '';
                    usernameField.value = '';
                    passwordField.value = '';
                } else {
                    // Handle other registration errors
                    console.error('Registration failed');
                    registrationMessage.textContent = 'Registration failed. Please try again.';
                    registrationMessage.classList.remove('text-success');
                    registrationMessage.classList.add('text-danger');
                }
            } else if (response.status === 400) {
                // User already exists
                console.error('User already exists');
                registrationMessage.textContent = 'User already exists. Please use a different email or username.';
                registrationMessage.classList.remove('text-success');
                registrationMessage.classList.add('text-danger');
            } else {
                // Handle other types of errors
                console.error(`Error: ${response.status} - ${response.statusText}`);
                registrationMessage.textContent = 'Registration failed. Please try again.';
                registrationMessage.classList.remove('text-success');
                registrationMessage.classList.add('text-danger');
            }
        } catch (error) {
            // Handle other generic errors
            console.error('Error:', error);
            registrationMessage.textContent = 'Error during registration. Please try again.';
            registrationMessage.classList.remove('text-success');
            registrationMessage.classList.add('text-danger');
        }
    }

    const registrationForm = document.getElementById('registration-form');
    const emailField = document.getElementById('exampleInputEmail1');
    const usernameField = document.getElementById('exampleInputUsername');
    const passwordField = document.getElementById('exampleInputPassword1');
    const emailValidationError = document.getElementById('email-validation-error');
    const usernameValidationError = document.getElementById('username-validation-error');
    const passwordValidationError = document.getElementById('password-validation-error');
    const registrationMessage = document.getElementById('registration-message');

    // Function to validate email format
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@(stud\.)?noroff\.no$/;
        return emailRegex.test(email);
    }

    // Add event listeners to clear error messages on input change
    emailField.addEventListener('input', function () {
        clearValidationError(emailValidationError);
        const email = emailField.value;
        if (email && !validateEmail(email)) {
            emailValidationError.textContent = 'Email must be a @noroff.no or @stud.noroff.no email';
        }
    });

    usernameField.addEventListener('input', function () {
        clearValidationError(usernameValidationError);
        const username = usernameField.value;
        if (username) {
            const usernameRegex = /^[a-zA-Z0-9_]+$/;
            if (!usernameRegex.test(username)) {
                usernameValidationError.textContent = 'Username can only contain letters, numbers, and underscores';
            }
        }
    });

    passwordField.addEventListener('input', function () {
        clearValidationError(passwordValidationError);
        const password = passwordField.value;
        if (password && password.length < 8) {
            passwordValidationError.textContent = 'Password must be at least 8 characters long';
        }
    });

    // Function to clear validation error message
    function clearValidationError(errorElement) {
        errorElement.textContent = '';
    }

    registrationForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = emailField.value;
        const username = usernameField.value;
        const password = passwordField.value;

        // Additional email validation check
        if (!validateEmail(email)) {
            emailValidationError.textContent = 'Email must be a @noroff.no or @stud.noroff.no email';
            return;
        }

        // Validate username format (no punctuation except underscore)
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            usernameValidationError.textContent = 'Username can only contain letters, numbers, and underscores';
            return;
        }

        // Validate password length
        if (password.length < 8) {
            passwordValidationError.textContent = 'Password must be at least 8 characters long';
            return;
        }

        const user = {
            name: username,
            email,
            password,
        };

        try {
            // Clear registration message
            registrationMessage.textContent = '';

            await registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);
        } catch (error) {
            console.error('Error:', error);
            registrationMessage.textContent = 'Error during registration. Please try again.';
            registrationMessage.classList.remove('text-success');
            registrationMessage.classList.add('text-danger');
        }
    });
});
