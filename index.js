function validate(field) {
  const loginEmail = document.querySelector("#login-email");
  const loginPassword = document.querySelector("#login-password");

  if (field === "email_field") {
    if (loginEmail.validity.valid) {
      loginEmail.classList.remove("is-invalid");
      loginEmail.classList.add("is-valid");
    } else {
      loginEmail.classList.add("is-invalid");
      loginEmail.classList.remove("is-valid");
    }
  } else if (field === "password_field") {
    if (loginPassword.validity.valid) {
      loginPassword.classList.remove("is-invalid");
      loginPassword.classList.add("is-valid");
    } else {
      loginPassword.classList.add("is-invalid");
      loginPassword.classList.remove("is-valid");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".needs-validation");

  form.addEventListener("submit", function (event) {
    validate("email_field");
    validate("password_field");

    if (!form.checkValidity()) {
      event.preventDefault();
    }
  });
});
