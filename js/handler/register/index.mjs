import { register } from "../../api/auth/register.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

/**
 * Attaches a submit event listener to the registration form.
 * When the form is submitted, it prevents the default form submission, extracts the form data, and attempts to register a new user.
 * If the registration is successful, it resets the form and displays a success message.
 * If the registration fails, it displays an error message.
 */

export function registerFormListener() {
  const form = document.querySelector("#registerForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      try {
        await register(profile);

        form.reset();
        displayMessage(
          "#message",
          "success",
          'You have successfully created an account. <a href="/">You can now log in.</a>'
        );
      } catch (error) {
        displayMessage("#message", "danger", error.message);
      }
    });
  }
}
