import { API_BASE_URL } from '../js/constants.js';
/**
 * Registers a new user.
 * @async
 * @function
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @throws Will throw an error if registration fails.
 * @returns {Promise<void>} No return value.
 */
export async function registerUser(name, email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/social/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const errorMessageDiv = document.getElementById('error-message');

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.errors && errorData.errors[0].message === 'Profile already exists') {
                errorMessageDiv.textContent = 'A profile with this email or username already exists. Please try logging in or use different credentials.';
            } else {
                errorMessageDiv.textContent = 'Registration failed. Please try again.';
                throw new Error('Registration failed');
            }
        } else {
            const data = await response.json();
            console.log('User registered successfully:', data);
            errorMessageDiv.textContent = 'User registered successfully!'; // Display a success message
            errorMessageDiv.classList.remove('text-danger');
            errorMessageDiv.classList.add('text-success');
            window.location.href = '/profile/index.html';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
/**
 * Logs in a user.
 * @async
 * @function
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @throws Will throw an error if login fails.
 * @returns {Promise<void>} No return value.
 */
export async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/social/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('User logged in successfully:', data);

        // Store the access token in localStorage
        localStorage.setItem('accessToken', data.accessToken);
        
         // Redirect to the profile or home page
         window.location.href = '/profile/index.html';

    } catch (error) {
        console.error('Error:', error);
    }
}
/**
 * Retrieves the authorization header.
 * @function
 * @returns {Object} The authorization header object.
 */
export function getAuthHeader() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No access token found in local storage');
    }
    return {
        Authorization: `Bearer ${token}`,
    };
}
/**
 * Event listener for window onload to handle form submission and checkbox change.
 * @listens window:onload
 */
window.onload = function() {
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = event.target.username.value;
            const email = event.target.email.value;
            const password = event.target.password.value;
            const submitButton = document.getElementById('submitButton');
            const isRegistering = submitButton.textContent === 'Register';

            if (isRegistering) {
                registerUser(username, email, password);
            } else {
                loginUser(email, password);
            }
        });
    }

    const isRegisteringCheckbox = document.getElementById('isRegistering');
    if (isRegisteringCheckbox) {
        isRegisteringCheckbox.addEventListener('change', updateButtonText);
        updateButtonText();
    }
};
/**
 * Updates the text of the submit button based on the checkbox state.
 * @function
 */
function updateButtonText() {
    const isRegistering = document.getElementById('isRegistering').checked;
    const submitButton = document.getElementById('submitButton');
    submitButton.textContent = isRegistering ? 'Register' : 'Login';
}