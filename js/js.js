/*function redirectToFeed() {
  window.location.href = "index.html";
}

document.getElementById("signinButton").addEventListener("click", redirectToFeed);

document.getElementById("inputPassword").addEventListener("input", function() {
  var password = this.value;
  var passwordError = document.getElementById("passwordError");

  if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters";
  } else {
    passwordError.textContent = "";
  }
});
*/


function redirectToFeed() {
  window.location.href = "index.html";
}

var signinButton = document.getElementById("signinButton");
var passwordInput = document.getElementById("inputPassword");
var passwordError = document.getElementById("passwordError");

document.getElementById("signinButton").addEventListener("click", function() {
  // Check the password length before redirecting
  if (passwordInput.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters";
  } else {
    passwordError.textContent = "";
    redirectToFeed();
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
