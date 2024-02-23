import { login } from "../../api/auth/login.mjs";
import * as storage from "../../handler/storage.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

/**
 * Attaches a submit event listener to the login form.
 * When the form is submitted, it calls the `dologin` function.
 */
export function loginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", dologin);
  }
}

/**
 * Handles the form submission event.
 * It prevents the default form submission, extracts the form data, and attempts to log in.
 * If the login is successful, it saves the user's token, username, and email to storage and redirects to the profile page.
 * If the login fails, it displays an error message.
 *
 * @param {Event} event - The form submission event.
 */
async function dologin(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  try {
    const response = await login(profile);
    const { accessToken, name, email } = response;

    storage.save("token", accessToken);
    storage.save("username", name);
    storage.save("email", email);

    location.href = "/profile/";
  } catch (error) {
    displayMessage("#message", "danger", error.message);
  }
}
