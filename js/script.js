// Contact form validation

const fullName = document.querySelector("#full-name");
const nameFeedbackCont = document.querySelector(".name-feedback-container");

const emailFeedbackCont = document.querySelector(".email-feedback-container");
const emailInput = document.querySelector("#email-input");

const passwordFeedbackCont = document.querySelector(".password-feedback-container");
const passwordInput = document.querySelector("#password-input");

const submitButton = document.querySelector("#submit-button");
const successCont = document.querySelector("#success-message-cont");

const consentRadio = document.querySelector("#consent-radio-button");

const registerForm = document.querySelector("#register-form");

// Name validation

fullName.addEventListener("change", nameInputValidation);

function nameInputValidation() {
    if (nameCheck(fullName.value) === false) {
        fullName.style.borderColor = "red";
        nameFeedbackCont.innerHTML = `<span class="text-danger">*Name should be at least 2 characters*</span>`;
    } else {
        fullName.style.borderColor = "green";
        nameFeedbackCont.innerHTML = `<span class="text-success">*Looks good*</span>`;
    }
};

// Email validation

emailInput.addEventListener("change", emailInputValidation);

function emailInputValidation() {
    if (emailCheck(emailInput.value) === false) {
        emailInput.style.borderColor = "red";
        emailFeedbackCont.innerHTML = `<span class="text-danger">*Please enter a valid email*</span>`;
    } else {
        emailInput.style.borderColor = "green";
        emailFeedbackCont.innerHTML = `<span class="text-success">*Looks good*</span>`;
    }
}

// pw validation

passwordInput.addEventListener("change", passwordInputValidation);

function passwordInputValidation() {
    if (passwordCheck(passwordInput.value) === false) {
        passwordInput.style.borderColor = "red";
        passwordFeedbackCont.innerHTML = `<span class="text-danger">*Password should be at least 8 characters*</span>`;
    } else {
        passwordInput.style.borderColor = "green";
        passwordFeedbackCont.innerHTML = `<span class="text-success">*Looks good*</span>`;
    }
}

// Form submit management

registerForm.addEventListener("submit", register);

function register() {
    // event.preventDefault();
    console.log(event);

    // Manage the name instructions
    if (nameCheck(nameInput.value) === false) {
        nameInput.style.borderColor = "red";
        nameFeedbackCont.innerHTML = `<span class="text-danger">*Name should be at least 2 characters*</span>`;
    } else {
        nameInput.style.borderColor = "green";
        nameFeedbackCont.innerHTML = `<span class="text-success">*Looks good*</span>`;
    }

    // Manage the email instructions
    if (emailCheck(emailInput.value) === false) {
        emailInput.style.borderColor = "red";
        emailFeedbackCont.innerHTML = `<span class="error-message">*Please enter a valid email*</span>`;
    } else {
        emailInput.style.borderColor = "green";
        emailFeedbackCont.innerHTML = `<span class="text-success">*Looks good*</span>`;
    }
    
    // Manage the password instructions
    if (passwordCheck(passwordInput.value) === false) {
        passwordInput.style.borderColor = "red";
        passwordFeedbackCont.innerHTML = `<span class="error-message">*Password must be at least 8 characters*</span>`;
    } else {
        passwordInput.style.borderColor = "green";
        passwordFeedbackCont.innerHTML = `<span class="text-success">*Looks good*</span>`;
    }

    // Submission validation and messaging.
    if (nameCheck(nameInput.value) && emailCheck(emailInput.value) && passwordCheck(passwordInput.value)) {
        successCont.innerHTML = `<span class="text-success">Your message was sent successfully!</span>`;
        form.reset();
        nameInput.style.borderColor = "#E48698";
        emailInput.style.borderColor = "#E48698";
        passwordInput.style.borderColor = "#E48698";
        nameFeedbackCont.innerHTML = "";
        emailFeedbackCont.innerHTML = "";
        passwordFeedbackCont.innerHTML = "";
    } else {
        successCont.innerHTML = `<span class="text-danger">Your message was not sent. Please correct the following:</span>`;
    }
};

function nameCheck(name) {
    const nameLength = name.trim().length;
    console.log(nameLength);
    if (nameLength >= 2) {
        return true;
    } else {
        return false;
    }
};

function emailCheck(email) {
    const regEx = /\S+@\S+\.\S+/;
    const validEmail = regEx.test(email);
    console.log(validEmail);
    return validEmail;
};

function passwordCheck(password) {
    const passwordLength = password.trim().length;
    console.log(passwordLength);
    if (passwordLength >= 8) {
        return true;
    } else {
        return false;
    }
};