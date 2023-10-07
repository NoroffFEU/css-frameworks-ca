import { register } from "../api/auth/register.js";

//use this as a teemplate to write other eventlisteners

export function setRegisterFormListener() {
    const form = document.querySelector("#registerForm");
    // console.log(form);

    // const password = document.querySelector("input[name=password]");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;
        // console.log(form);

        // less work than having 5 query selectors ass commented out above, but still a lot of lines to write
        // const email = form.email.value;
        // const name = form.name.value;
        // const password = form.password.value;
        // const banner = form.banner.value;
        // const avatar = form.avatar.value;

        //to have less repitition, we can turn the form data directly into an object

        const formData = new FormData(form); //provide the form data to this constructor
        // const password = formData.get("password");

        // const profile = formData.entries() //using an object prototype method. Loop through an object an gives you the key AND the value. Gives you an array with key and value.

        //but since we want an object, not an array, we can say
        const profile = Object.fromEntries(formData.entries());
        console.log("This is the users profile info when register", profile);

        //Now we have collected the profile data.
        // Now we want to send it to the API. This task should be handled on its own. In a new function for instance.
        // if we start making API code in here we will make the function less reusable.
        //and we are also binding two tasks very tightly together.
        // 1. the task of listening to the form
        // 2. the task of communicating with the API
        // these two tasks should be tested individually
        //creating a folder in the API folder called auth.

        //Send it to the API
        register(profile);
    });
}
