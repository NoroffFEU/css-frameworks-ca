import { loginUser } from "../../api/authorization/login.js";
import { messageForUser } from "../../ui/messageForUser.js";
import * as utils from "../../utils/storage/storage.js";

/**
 * Handles the login form submission.
 *
 * When the form is submitted, it prevents the default form submission, retrieves the form data, and attempts to log in the user.
 * If the login is successful, it saves the user's token, name, and email to storage, resets the form, and redirects the user to the feed page.
 * If the login fails, it displays an error message to the user.
 */

export function loginFormHandler() {
  const form = document.querySelector("#loginForm");
  form.addEventListener("submit", loginForm);
}

async function loginForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const entries = formData.entries();
  const userData = Object.fromEntries(entries);
  const fieldset = form.querySelector("fieldset");

  try {
    fieldset.disabled = true;
    const { accessToken, name, email } = await loginUser(userData);

    if (accessToken) {
      utils.save("token", accessToken);
      utils.save("userName", name);
      utils.save("email", email);
      console.log(accessToken, name, email);
      form.reset();
      window.location.href = "/feed";
    }
  } catch (error) {
    console.error("Login error:", error.message);
    messageForUser("#loginMessage", "danger", error.message);
  } finally {
    fieldset.disabled = false;
  }
}
