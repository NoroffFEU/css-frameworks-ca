import { login } from "../api/auth/login.js";

//use this as a teemplate to write other eventlisteners

export function setLoginFormListener() {
    const form = document.querySelector("#loginForm");
    //this says: proceed if there is a form. If it fails to find the loginform it won't do anything
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form); //provide the form data to this constructor

            // const profile = formData.entries() //Loop through an object an gives you the key AND the value. Gives you an array with key and value.
            //want an object, not an array, we can say
            const profile = Object.fromEntries(formData.entries());
            console.log("This is the users profile info when logging in", profile);

            //Now we have collected the profile data.
            //Send it to the API
            login(profile);
        });
    }
}
