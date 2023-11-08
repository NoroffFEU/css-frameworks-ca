import { formCheck } from "./components/formValidation.mjs";
import { submitForm } from "./components/submitForm.mjs";

const formElem = document.querySelector("form");
const fieldset = document.querySelector("fieldset");
const formInputs = fieldset.elements;
const btn = document.querySelector(".btn-primary");
const divForError = document.querySelector(".error-box");

for (let i = 0; i < formInputs.length; i++) {
    const input = formInputs[i];
    input.onkeyup = () => formCheck(formInputs, btn);
}

const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint; 
let completeUrl;

if (document.title === "Noroff Social Media | Sign up") {
    endpoint = "/social/auth/register";
    completeUrl = `${baseUrl}${endpoint}`;
} else  {
    endpoint = "/social/auth/login";
    completeUrl = `${baseUrl}${endpoint}`;
}


btn.onclick = (e) => {
    e.preventDefault();
    submitForm(formElem, completeUrl, divForError);
}

// TESTING PURPOSES; LOGIN WITH:
// Name: vegard
// email: my@stud.noroff.no
// Pass: Troll123123
// THIS USER WORKS, and I know for sure that the postData function as well as the submitForm function works as  they should
// When I use the function to log in with these credentials, I receive a JWT in my finishedResponse object
