/*---------- ----------*/
/*---------- Light/Dark Mode ----------*/
function darkMode() {
  var element = document.body;
  element.dataset.bsTheme = element.dataset.bsTheme == "light" ? "dark" : "light";
  /*---------- Light/Dark Mode Label ----------*/
  var switchLabel = document.getElementById("darkModeLabel");
  if (element.dataset.bsTheme == "light") {
    switchLabel.textContent = "Dark Mode";
  } else {
    switchLabel.textContent = "Light Mode";
  }
}

/*---------- Dark Mode HTML (test) ----------*/
// function darkMode() {
//   var html = document.querySelector("html");
//   html.dataset.bsTheme = html.dataset.bsTheme == "light" ? "dark" : "light";
// }

/*---------- Login Form ----------*/
const form = document.querySelector("#loginForm");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");

/*---------- Form Validation Requirements ----------*/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

/*---------- Form Submission eventlistener ----------*/
form.addEventListener("submit", (event) => {
  event.preventDefault();

  /*---------- get input values ----------*/
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  /*----- Validate Email -----*/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  /*----- Validate Password -----*/
  if (!passwordRegex.test(password)) {
    alert("Please enter a valid password. Your password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.");
    return;
  }

  /*---------- If valid redirect ----------*/
  window.location.href = "/profile/index.html";
});

/*---------- You have to log in ----------*/
const profileLink = document.getElementById("profile-link");
profileLink.addEventListener("click", function (event) {
  event.preventDefault();
  alert("You have to log in.");
});

/*---------- Sort Functionality ----------*/

//// :(  /////
