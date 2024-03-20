
//---------- login user ---------//

import { LOGIN_URL } from '../shared/constans.js';
import { doFetch } from '../shared/fetch.js';
import { addAuthToken } from '../shared/auth.js';

const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    // console.log(event);
    const email = event.target[0].value;
    const password = event.target[1].value;
    loginUser(email, password);
}) 

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
            window.location.href = 'html/feed/posts.html';
        }, 2000); 
    } else {
        throw new Error ('No access token provided');
    }

}

