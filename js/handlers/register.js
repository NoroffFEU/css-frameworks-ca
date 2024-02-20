





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




export async function doFETCH(url, options = {}) {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };
        const combinedOptions = {headers, ...options};
        const response = await fetch(url, combinedOptions);
        console.log(response)
        const json = await response.json();
        return json;

    } catch (error) {
        throw error;
        console.log(error);

    } finally {

    }
}
