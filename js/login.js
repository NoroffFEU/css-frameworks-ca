const signUpForm = document.getElementById("signUpForm");
const email_message = document.getElementById("email_message");
const name_message = document.getElementById("name_message");
const password_message = document.getElementById("password_message");
const confirm_password_message = document.getElementById(
  "confirm_password_message"
);

const API_BASE_URL = "https://api.noroff.dev/api/v1";
const registerUrl = `${API_BASE_URL}/social/auth/register`;
const loginUrl = `${API_BASE_URL}/social/auth/login`;

async function loginUser(url, userdata) {}

async function registerUser(url, userData) {
  console.log(url, userData);
  const methodOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const response = await fetch(url, methodOptions);
  const json = await response.json();
  console.log(json);
}

function validateForm({ name, email, password, confirmPassword }, formData) {
  let isValid = true;
  if (password.length < 8) {
    password_message.classList.remove("d-none");
    isValid = false;
  } else {
    password_message.classList.add("d-none");
  }

  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  console.log(email);
  if (!patternMatches) {
    email_message.classList.remove("d-none");
    isValid = false;
  } else {
    email_message.classList.add("d-none");
  }

  if (!email.includes("noroff.no")) {
    email_message.classList.remove("d-none");
    isValid = false;
  } else {
    email_message.classList.add("d-none");
  }
  {
  }

  if (name.length === 0) {
    name_message.classList.remove("d-none");
    isValid = false;
  } else {
    name_message.classList.add("d-none");
  }

  if (confirmPassword != password) {
    confirm_password_message.classList.remove("d-none");
    isValid = false;
  } else {
    confirm_password_message.classList.add("d-none");
  }

  if (isValid) {
    registerUser(registerUrl, formData);
  }
}

signUpForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value.replace(/ /g, "");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const formData = {
    name: name,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };
  validateForm(formData, formData);
});
