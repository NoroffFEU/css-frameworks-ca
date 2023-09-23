//Checking for correct Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const emailValue = emailInput.value.trim().toLowerCase();

  const validDomains = ["stud.noroff.no", "noroff.no"];
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailPattern.test(emailValue)) {
    emailError.textContent = "Invalid email address format";
    emailInput.setCustomValidity("Invalid email address format");
  } else {
    const domain = emailValue.split("@")[1];
    if (validDomains.includes(domain)) {
      emailError.textContent = "";
      emailInput.setCustomValidity("");
    } else {
      emailError.textContent =
        "Email domain must be stud.noroff.no or noroff.no";
      emailInput.setCustomValidity(
        "Email domain must be stud.noroff.no or noroff.no"
      );
    }
  }
}

validateEmail();
