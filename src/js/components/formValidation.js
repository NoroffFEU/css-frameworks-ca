const formInputs = document.querySelector("fieldset").elements;
const btn = document.querySelector(".btn-primary");

/**
 * 
 * @param {arrayOfBooleans} arr 
 * @returns false, unless all Booleans are true
 */
const trueChecker = arr => arr.every(Boolean);


/**
 * A simple form validation. Checks all inputs the validity of all inputs (validated directly in HTML) and creates an array of
 * booleans. Afterwards, the trueChecker function checks if all the booleans are true, and then I extract a variable from  this. 
 * If all the form inputs are validated in HTML, you're good to go!
 * 
 * There is a "pattern" attribute in the email input, which handles regex for me. I could have added this via JS, 
 * but hardcoding the regex in HTML did the same job and keeps the code generic and reusable. 
 */
function formCheck() {
    const trueCheckerArr = [];

    for (let i = 0; i < formInputs.length; i++) {

        const inputsValidity = formInputs[i].validity.valid;
        trueCheckerArr.push(inputsValidity);
        
    }
    
    const checker =  trueChecker(trueCheckerArr);

    if (!checker) {
        btn.disabled = true;
    } else  {
        btn.disabled = false;
    }
}


for (let i = 0; i < formInputs.length; i++) {
    const input = formInputs[i];
    input.onkeyup = (e) => formCheck();
}