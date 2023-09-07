const API_BASE_URL = 'https://api.noroff.dev/api/v1';

async function registerUser(name, email, password) {
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
        }
    } catch (error) {
        console.error('Error:', error);
    }
}




async function loginUser(email, password) {
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
    } catch (error) {
        console.error('Error:', error);
    }
}

function getAuthHeader() {
    const token = localStorage.getItem('accessToken');
    return {
        Authorization: `Bearer ${token}`,
    };
}

document.getElementById('authForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

       // Call your registerUser or loginUser function here
    registerUser(username, email, password);
});