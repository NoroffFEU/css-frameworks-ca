import { registerUser } from "../../api/authorization/register.js";
import { messageForUser } from "../../ui/messageForUser.js";

/**
 * Handles the registration form submission.
 *
 * When the form is submitted, it prevents the default form submission, retrieves the form data, and attempts to register the user.
 * If the registration is successful, it displays a success message to the user, resets the form, and closes the registration modal after 3 seconds.
 * If the registration fails, it displays an error message to the user.
 */

export function registerFormHandler() {
  const form = document.querySelector("#registerForm");
  form.addEventListener("submit", registerForm);
}

async function registerForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const entries = formData.entries();
  const userDetails = Object.fromEntries(entries);

  try {
    await registerUser(userDetails);
    messageForUser("#message", "success", "You are registered. Please login!");
    form.reset();
    setTimeout(() => {
      var myModal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
      myModal.hide();
    }, 3000);
  } catch (error) {
    console.log(error);
    messageForUser("#message", "danger", error.message);
    throw error;
  }
}
