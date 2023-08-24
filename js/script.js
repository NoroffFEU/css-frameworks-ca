const password = document.getElementById("floatingPassword");
const login = document.getElementById("login");

const form = document.getElementById("loginForm");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting

  if (password.value.length >= 8) {
    window.location.href = "feed/index.html";
  } else {
    alert("Password must be 8 characters or longer");
  }
});
