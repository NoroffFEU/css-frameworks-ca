
//---------- register user ---------//

import { REGISTER_URL } from '../shared/constans.js';

// const BASE_URL = `https://api.noroff.dev/api/v1`; 
// import { REGISTER_URL }  = `${BASE_URL}/social/auth/register`;

import { doFetch } from '../handlers/fetch.js';

const registrationForm = document.querySelector('#registrationForm');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event);
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    registerUser(name, email, password);
})

async function registerUser(name, email, password) {
    // console.log('register user');
    await doFetch(REGISTER_URL, false, {  
        method: 'POST',
        body: JSON.stringify({
            name, 
            email, 
            password,
        }),
    });
    
}






// const registrationForm = document.querySelector('#registrationForm');

// registrationForm.addEventListener('submit', (event) =>{
//     event.preventDefault();
//     // console.log(event);
//     const name = event.target[0].value;
//     const email = event.target[1].value;
//     const password = event.target[2].value;
//     registerUser(name, email, password);
// })

// export async function registerUser(name, email, password) {
//     // console.log('login user');
//     await doFetch(REGISTER_URL, {  
//         method: 'POST',
//         body: JSON.stringify({
//             name, 
//             email, 
//             password,
//         }),
//     });
    
// }
