const formInputs = document.querySelector("fieldset").elements;
const btn = document.querySelector(".btn-primary");


/**
 * A simple form validation. Checks all inputs, and if all inputs are validated in the HTML, you're good! 
 * There is a "pattern" attribute in the email input, which handles regex for me. I could have added this via JS, 
 * but hardcoding the regex in HTML did the same job
 */
function formCheck() {

    for (let i = 0; i < formInputs.length; i++) {
        if (formInputs[i].validity.valid) {
            btn.disabled = false;
            
        }else{
            btn.disabled = true;
        }
    }
}


for (let i = 0; i < formInputs.length; i++) {
    const input = formInputs[i];
    input.onkeyup = (e) => formCheck();
}