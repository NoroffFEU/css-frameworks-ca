function redirectToProfile() {
  window.location.href = "profile.html";
}

var signinButton = document.getElementById("signinButton");
var passwordInput = document.getElementById("inputPassword");
var passwordError = document.getElementById("passwordError");

document.getElementById("signinButton").addEventListener("click", function() {
 
  if (passwordInput.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters";
  } else {
    passwordError.textContent = "";
    redirectToProfile();
  }
});

passwordInput.addEventListener("input", function() {
  var password = this.value;

  if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters";
    signinButton.disabled = true;
  } else {
    passwordError.textContent = "";
    signinButton.disabled = false;
  }
});
