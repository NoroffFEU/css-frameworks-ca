import { API_BASE_URL } from '../js/constants.js';
/**
 * Registers a new user.
 * @async
 * @function
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @throws Will throw an error if registration fails.
 * @returns {Promise<void>} No return value.
 */
export async function registerUser(name,email, password) {
    if (!isValidEmail(email)) {
        errorMessageDiv.textContent = 'Please enter a valid email address.';
        return;
    }
    try {
        let response = await fetch(`${API_BASE_URL}/social/auth/register`, {
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
                errorMessageDiv.textContent = 'A profile with this email already exists. Please try logging in or use different credentials.';
            } else {
                errorMessageDiv.textContent = 'Registration failed. Please try again.';
                throw new Error('Registration failed');
            }
        } else {
            // Automatically log the user in after successful registration
            response = await fetch(`${API_BASE_URL}/social/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                // Store the token, e.g., in local storage
                localStorage.setItem('accessToken', data.accessToken);
                window.location.href = '/profile/index.html';
            } else {
                errorMessageDiv.textContent = 'Login after registration failed. Please try logging in again.';
            }
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
     if (!isValidEmail(email)) {
        errorMessageDiv.textContent = 'Please enter a valid email address.';
        return;
    }
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
        const data = await response.json();
        if (!response.ok) {
            console.error('Server Response:', data); // Use the already parsed data
            const errorMessageDiv = document.getElementById('error-message');
            if (data.errors && data.errors[0].message === 'Invalid email or password') {
                errorMessageDiv.textContent = 'Invalid email or password. Please try again.';
            } else if (data.errors && data.errors[0].message === 'Email must be a valid email') {
                errorMessageDiv.textContent = 'Please enter a valid email address.';
            } else {
                errorMessageDiv.textContent = 'Login failed. Please, register as a new user!';
            }
            throw new Error(data.errors[0].message); // Throw the error message from the server
        } else {
            console.log('User logged in successfully:', data);
        
            // Store the access token in localStorage
            localStorage.setItem('accessToken', data.accessToken);
            
            // Show the sign-out button
            const signOutButton = document.getElementById('signOutButton');
            if (signOutButton) {
                signOutButton.style.display = '';
            }
        
            // Redirect to the profile or home page
            window.location.href = '/profile/index.html';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
/**
 * Signs out the user.
 * @function
 */
export function signOut() {
    // Remove the access token from local storage
    localStorage.removeItem('accessToken');
    
    // Redirect to the login page
    window.location.href = '/index.html'; // Update the path accordingly
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
 * Updates the text of the submit button, the `<h2>` heading, and the visibility of the email input and label 
 * based on the checkbox state (registering or logging in).
 * 
 * If the user is registering (checkbox is checked):
 * - The submit button text changes to "Register".
 * - The `<h2>` heading text changes to "Register".
 * - The email input and its associated label are displayed.
 * 
 * If the user is logging in (checkbox is not checked):
 * - The submit button text changes to "Login".
 * - The `<h2>` heading text changes to "Login".
 * - The email input and its associated label are hidden.
 * 
 * @function
 */
function updateButtonText() {
    const isRegisteringCheckbox = document.getElementById('isRegistering');
    if (!isRegisteringCheckbox) return;
    const isRegistering = isRegisteringCheckbox.checked;
    const submitButton = document.getElementById('submitButton');
    const emailInput = document.getElementById('email');
    const emailLabel = document.querySelector('label[for="email"]');
    const heading = document.querySelector('.heading');
    submitButton.textContent = isRegistering ? 'Register' : 'Login';
    heading.textContent = isRegistering ? 'Register' : 'Login';
    emailInput.style.display = '';
    emailLabel.style.display = '';
    emailInput.setAttribute('required', true);
}
/**
 * Handles the form submission for both registration and login.
 * @param {Event} event - The form submission event.
 */
function handleFormSubmission(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const submitButton = document.getElementById('submitButton');
    const isRegistering = submitButton.textContent === 'Register';

    if (isRegistering) {
        registerUser(name, email, password);
    } else {
        loginUser(email, password);
    }
}
/**
 * Initializes the checkbox for toggling between registration and login.
 * Adds an event listener for changes and updates the button text accordingly.
 */
function initializeCheckbox() {
    const isRegisteringCheckbox = document.getElementById('isRegistering');
    if (isRegisteringCheckbox) {
        isRegisteringCheckbox.addEventListener('change', updateButtonText);
        updateButtonText();
    }
}
/**
 * Initializes the sign-out button.
 * Adds an event listener for the click event and handles the visibility based on the authentication state.
 */
function initializeSignOutButton() {
    const signOutButton = document.getElementById('signOutButton');
    if (!signOutButton) return;  // Exit early if the button doesn't exist

    signOutButton.addEventListener('click', signOut);
    
    if (localStorage.getItem('accessToken')) {
        signOutButton.style.display = ''; // Show the button
    } else {
        signOutButton.style.display = 'none'; // Hide the button
    }
}
/**
 * Validates the provided email using a regular expression.
 * @param {string} email - The email to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}
/**
 * Initializes the page by setting up event listeners for form submission, checkbox changes, and sign-out button.
 */
window.onload = function() {
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleFormSubmission);
    }
    initializeCheckbox();
    initializeSignOutButton();
};

