function validateForm(event) {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  
  if (!emailInput.checkValidity()) {
      event.preventDefault();
      emailError.style.display = "block";
  } else {
      emailError.style.display = "none";
  }

  if (!passwordInput.checkValidity()) {
      event.preventDefault();
      passwordError.style.display = "block";
  } else {
      passwordError.style.display = "none";
  }
}

function showNewUserForm() {
}

function showForgotPasswordForm() {
}

