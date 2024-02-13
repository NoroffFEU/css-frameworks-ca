// Inneholder logikk relatert til brukerautentisering (registrering, innlogging, JWT-håndtering)

const API_BASE_URL = 'https://api.noroff.dev';

const API_HOST_URL = 'https://api.noroff.dev';
const API_BASE = '/api/v1';
const API_SOCIAL_BASE = '/social';
const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;

//End-point:
// Register: /api/v1/social/auth/register
// Login: /api/v1/social/auth/login
// Get all posts: /api/v1/social/posts



//---------------------- Validering av epost ---------------

// function validateEmail(email) {
//     const regEx = /^[a-zA-Z0-9._-]+@(noroff.no|stud.noroff.no)$/;
//     return regEx.test(email);
// }






// -------------------- Registrering av bruker-------------------

/**
 * Registers a new user by sending a POST request to the specified URL with user data.
 *
 * @param {string} url The URL of the registration endpoint.
 * @param {Object} data An object containing the user's registration data.
 * @param {string} data.name The user's name.
 * @param {string} data.email The user's email address.
 * @param {string} data.password The user's password.
 * @returns {Promise<void>} A Promise that resolves when the registration request is completed.
 * ```js
 * registerUser(registerUrl, user);
 * ```
 */




// async function registerUser(url, data) {
//     // console.log(url, data);
//     try {
//         const postData = {
//             method: 'POST', 
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         };

//         const response = await fetch(url, postData);
//         console.log(response);
//         const json = await response.json();
//         console.log(json);

//     } catch(error) {
//         console.log(error);
//     }
// }

// //example of user account
// const user = {
//     name: 'kristin',
//     email: 'kristin@noroff.no',
//     password: 'test-password',
// }

// const registerUrl = `${API_BASE_URL}/api/v1/social/auth/register`;

// registerUser(registerUrl, user); denne hadde jeg allerede kommentert ut fra før!






// async function registerUser(data) {
//     const url = `${API_BASE_URL}/api/v1/social/auth/register`;
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });
//         const json = await response.json();
//         console.log(json);
//         return json; // Returner responsen for videre håndtering
//     } catch(error) {
//         console.error(error);
//         throw error; // Kast feilen for videre feilhåndtering
//     }
// }











//----------------------- Logge inn bruker --------------

/**
 * Logs in a user by sending a POST request to the specified URL with login credentials.
 * If successful, stores the access token in local storage.
 *
 * @param {string} url The URL of the login endpoint.
 * @param {Object} data An object containing the user's login credentials.
 * @param {string} data.email The user's email address.
 * @param {string} data.password The user's password.
 * @returns {Promise<void>} A Promise that resolves when the login request is completed.
 * ```js
 * loginUser(loginUrl, userLogin);
 * ```
 */

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
        console.log(json);
        
        const accessToken = json.accessToken;
        localStorage.setItem('accessToken', accessToken);
        window.location.href = 'html/profile.html';

        } catch (error) {
            console.log(error);
    }
};

const userLogin = {
    email: 'kristin@noroff.no',
    password: 'test-password',
};

const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`;

// loginUser(loginUrl, userLogin);







const BASE_URL = 'https://v2.api.noroff.dev';    // legge disse i en egen fil og importerer dem inn
const REGISTER_URL = `${BASE_URL}/auth/register`;

const registrationForm = document.querySelector('#registrationForm');

import { doFetch} from '../../handlers/register.js';

registrationForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    // console.log(event);
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    registerUser(name, email, password);
})

async function registerUser(name, email, password) {
    // console.log('register user');
    await doFetch(REGISTER_URL, {   //disse tre prikkene betyr at den ikke finner register url. trykk tab på mac og legg inn riktig se 1 time på video collb js2 13.02
        method: 'POST',
        body: JSON.stringify({
            name, 
            email, 
            password,
        }),
    });
}








//----------------------- Request with token -----------

/**
 * Performs a GET request to the specified URL using an authorization token.
 * Retrieves data from the server based on the provided URL and the user's access token.
 *
 * @param {string} url The URL to which the request is sent.
 * @returns {Promise<void>} A Promise that resolves when the GET request is completed and logs the response.
 * ```js
 * fetchWithToken(postsUrl);
 * ```
 */

async function fetchWithToken(url) {
    try {
        console.log(url);
        const token = localStorage.getItem('accessToken');
        console.log(token);
        const getData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            },
        };
        const response = await fetch(url, getData);
        console.log(response);
        const json = await response.json();
        console.log(json);
    } catch(error) {
        console.log(error);
    }
}

const postsUrl = `${API_BASE_URL}/api/v1/social/posts`;


fetchWithToken(postsUrl);
