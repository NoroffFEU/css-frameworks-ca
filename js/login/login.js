
//---------- login user ---------//

const loginForm = document.querySelector('#loginForm');

import { LOGIN_URL } from '../shared/constans.js';
import { doFetch} from '../register/register.js';

loginForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log(event);
    const email = event.target[0].value;
    const password = event.target[1].value;
    loginUser(email, password);
})

async function loginUser(email, password) {
    // console.log('login user');
    await doFetch(LOGIN_URL, {  
        method: 'POST',
        body: JSON.stringify({
            email, 
            password,
        }),
    });
}
