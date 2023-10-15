import { validateUserName, validateEmail, validatePassword, userName, email, password, emailLogin, loginPassword } from "./components/form-validate.mjs";
import { registerUrl, loginUrl } from "./components/api-url.mjs";
import { loader, message } from "./components/message.mjs";

const loginForm = document.querySelector(".form-switch");
const createAccountForm = document.querySelector(".create-account-form ");
const switchToCreateAccBtn = document.querySelector(".switch-create-acc");
const swithToLoginBtn = document.querySelector(".switch-login-form");
loginForm.classList.add("d-none");
switchToCreateAccBtn.onclick = function switchToCreateAcc() {
  loginForm.classList.add("d-none");
  createAccountForm.classList.remove("d-none");
};
swithToLoginBtn.onclick = function () {
  loginForm.classList.remove("d-none");
  createAccountForm.classList.add("d-none");
};

const createAccButton = document.querySelector("#createAccountBtn");

createAccButton.onclick = function validateRegister(event) {
  event.preventDefault();
  validateUserName(userName);
  validateEmail(email);
  validatePassword(password);

  if (validateUserName(userName) && validateEmail(email) && validatePassword(password)) {
    const userRegisterInfo = {
      name: userName.value,
      email: email.value,
      password: password.value,
    };

    async function registerUser(url, data) {
      try {
        const postData = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

        const response = await fetch(url, postData);
        const json = await response.json();
        const messageDiv = document.getElementById("messageDiv");

        if (response.ok) {
          messageDiv.innerHTML = "Your account has been successfully registered!";
          messageDiv.classList.remove("d-none");
          messageDiv.classList.add("success-message");
          loginForm.classList.remove("d-none");
          createAccountForm.classList.add("d-none");

          setTimeout(() => {
            messageDiv.classList.add("d-none");
          }, 2500);
        } else {
          throw new Error("Could not create account. It may be existed!");
        }
        return json;
      } catch (error) {
        loader.classList.add("text-danger");
        loader.innerHTML = message("error", error);
      }
    }

    registerUser(registerUrl, userRegisterInfo);
  }
};

const loginButton = document.querySelector("#login-btn");

async function loginUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    const json = await response.json();
    const { accessToken, name, avatar } = json;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", name);
    localStorage.setItem("avatar", avatar);

    if (response.ok) {
      window.location.href = "./feed/index.html";
    } else {
      throw new Error("Please try again");
    }
    return json;
  } catch (error) {
    loader.classList.add("text-danger");
    loader.innerHTML = message("error", error);
  }
}

loginButton.addEventListener("click", getLoginUser);
function getLoginUser(event) {
  event.preventDefault();
  const userLoginInfo = {
    email: emailLogin.value,
    password: loginPassword.value,
  };
  loginUser(loginUrl, userLoginInfo);
}
