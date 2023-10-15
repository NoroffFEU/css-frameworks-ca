const userName = document.querySelector("#username");
const nameError = document.querySelector("#username_error");
const email = document.querySelector("#register-email");
const emailError = document.querySelector("#email_error");
const password = document.querySelector("#register-password");
const passwordError = document.querySelector("#password_error");
const emailLogin = document.querySelector("#email-login");
const emailLoginError = document.querySelector("#emailLoginError");
const loginPassword = document.querySelector("#login-password");

const checkLength = (value, len) => value.trim().length > len;

function validateUserName(userName) {
  const regEx = /^[\w]+$/;
  const patternMatches = regEx.test(userName.value);
  if (checkLength(userName.value, 20) !== true && patternMatches === true) {
    nameError.style.display = "none";
    return true;
  } else {
    nameError.style.display = "block";
    return false;
  }
}

function validateEmail(email) {
  const regEx = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  const patternMatches = regEx.test(email.value);

  if (patternMatches === true) {
    emailError.style.display = "none";
    return true;
  } else {
    emailError.style.display = "block";
    return false;
  }
}

function validatePassword(password) {
  if (checkLength(password.value, 7) === true) {
    passwordError.style.display = "none";
    return true;
  } else {
    passwordError.style.display = "block";
    return false;
  }
}

export { validateUserName, validateEmail, validatePassword, userName, email, password, emailLogin, loginPassword };
