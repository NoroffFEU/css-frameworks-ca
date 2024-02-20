
//---------- login user ---------//

import { LOGIN_URL } from '../shared/constans.js';
import { doFetch } from '../handlers/fetch.js';
import { addAuthToken } from '../handlers/auth.js';

const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log(event);
    const email = event.target[0].value;
    const password = event.target[1].value;
    loginUser(email, password);
}) //Trenger jeg all denne koden ??

async function loginUser(email, password) {
    // console.log('register user');
    const response = await doFetch(LOGIN_URL, false, {  
        method: 'POST',
        body: JSON.stringify({
            email, 
            password,
        }),
    });
    const accessToken = response.accessToken;
    if (accessToken) {
        addAuthToken(accessToken);
        setTimeout(() => {
            window.location.href = 'html/posts.html';
        }, 2000); 
    } else {
        throw new Error ('No access token provided');
    }

}

// export async function loginUser(email, password) {
//     // console.log('login user');
//     const response = await doFetch(LOGIN_URL, {  
//         method: 'POST',
//         body: JSON.stringify({
//             email, 
//             password,
//         }),
//     });
//     console.log(response);
//     const accessToken = response.accessToken;

//     if (accessToken) {
//         addAuthToken(accessToken);
//         setTimeout(() => {
//             window.location.href = '/posts';
//         }, 2000);
//     } else {
//         throw new Error('No access token provided');
//     }
// }