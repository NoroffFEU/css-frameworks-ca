import { formCheck } from "./components/formValidation.mjs";

const formElem = document.querySelector(".add-post-form");
const fieldset = document.querySelector(".add-post-fieldset");
const formInputs = fieldset.elements;
const btn = document.querySelector(".add-post-btn");
const divForError = document.querySelector(".error-box");

for (let i = 0; i < formInputs.length; i++) {
    const input = formInputs[i];
    input.onkeyup = () => formCheck(formInputs, btn);
}

const textarea = document.querySelector("textarea");
console.dir(textarea);