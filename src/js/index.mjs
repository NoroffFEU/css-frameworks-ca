import { formCheck } from "./components/formValidation.mjs";
import { postData } from "./components/postData.mjs";

const formElem = document.querySelector("form");
const fieldset = document.querySelector("fieldset");
const formInputs = fieldset.elements;
const btn = document.querySelector(".btn-primary");

for (let i = 0; i < formInputs.length; i++) {
    const input = formInputs[i];
    input.onkeyup = () => formCheck(formInputs, btn);
}

const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint; 
let completeUrl;

function submitForm (e) {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    console.log(formData);
    let formdataOBj = {};
    formdataOBj = Object.fromEntries(formData.entries());
    console.log(formdataOBj);

    
    // if (document.title === "Noroff Social Media | Sign up") {
    //     endpoint = "/social/auth/register";
    //     completeUrl = `${baseUrl}${endpoint}`;
    //     postData(completeUrl, formData);
    // } else  {
    //     endpoint = "/social/auth/login";
    //     completeUrl = `${baseUrl}${endpoint}`;
    //     postData(completeUrl, formData);
    // }
};

formElem.addEventListener("submit", submitForm);