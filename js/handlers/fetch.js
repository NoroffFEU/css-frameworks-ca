

// import { register } from "../api/auth/register.js";

// export function setRegisterFormListener() {
    
//         const form = document.querySelector("#registerForm");

//     form.addEventListener("submit", (event) =>{
//         event.preventDefault();

//         const form = event.target;
//         const formData = new FormData(form);
//         const profile = Object.fromEntries(formData.entries());
        
//         // console.log("setRegisterFormListener kjører");

//         // Send it to the API
//         register(profile);

//     });
// }




// const name = form.name.value;
// const email = form.email.value;
// const password = form.password.value;

// const profile = {
//     email,
//     name, 
//     password
// }






//eller 




// doFETCH 



// import { getAuthToken } from './auth.js';

// export async function doFetch(url, options = {}) {
//   try {
//     const response = await fetch(url);
//     console.log("Status code:", response.status);

//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   } finally {
//     //
//   }
// }

//

// import { getAuthToken } from './auth.js';

// export async function doFetch(url, isAuth = false, options = {}) {
//   try {
//     const headers = {
//       'Content-Type': 'application/json',
//     };
//     if (isAuth) {
//       const authToken = getAuthToken();
//       headers['Authorization'] = `Bearer ${authToken}`;
//     }
//     const combinedOptions = { headers, ...options };
//     const response = await fetch(url, combinedOptions);
//     console.log("Status code:", response.status);

//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   } finally {
//     //
//   }
// }








// v1:

import { getAuthToken } from './auth.js';

export async function doFetch(url, isAuth = false, options = {}) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
    if (isAuth) {
      const authToken = getAuthToken();
      headers['Authorization'] = `Bearer ${authToken}`;
    }

      const combinedOptions = { headers, ...options };
      console.log(combinedOptions);
      
      const response = await fetch(url, combinedOptions);
      console.log(response);

      console.log("Status code:", response.status);
  
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      //
    }
}