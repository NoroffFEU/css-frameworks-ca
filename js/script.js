const form = document.querySelector("#contactForm");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");




function validateForm() {
  event.preventDefault();

  if(validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if(checkLength(password.value, 7) === true) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }

  if(validateEmail(email.value) === true && checkLength(password.value, 7) === true) {
    document.location.href = '/profile/index.html';
  }
}


form.addEventListener("submit", validateForm)


function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}