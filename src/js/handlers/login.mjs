import { login } from "../api/auth/login.mjs";
import * as index from "../storage/index.mjs";
import displayMessage from "../api/ui/common/displayMessage.mjs";

/**
  *Sets up the listener for the login form submission.
*/
export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", handleLogin);
  }
}

/**
  *Handles the login form submission.
  *@param {Event} event - The form submission event.
*/
async function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const emailData = formData.get("email");
  const passwordData = formData.get("password");

  const button = form.querySelector("button");
  button.innerText = "Logging in...";

  const fieldset = form.querySelector("fieldset");
  fieldset.disabled = true;

  try {
    const bodyData = { email: emailData, password: passwordData };
    const response  = await login(bodyData);
    index.save("token", response.accessToken);
    index.save("name", response.name);
    index.save("profile", response);
    location.href = "/posts/";
  } catch (error) {
    console.error(error);
    displayMessage("danger", error, "#message");
  } finally {
    button.innerText = "Login";
    fieldset.disabled = false;
  }
};
