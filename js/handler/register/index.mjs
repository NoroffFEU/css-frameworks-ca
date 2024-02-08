import { register } from "../../api/auth/register.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

export function registerFormListener() {
  const form = document.querySelector("#registerForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      console.log(profile);

      // sent to the API

      try {
        await register(profile);
        // This display a message if the user is successfully registered
        form.reset();
        displayMessage(
          "#message",
          "success",
          'You have successfully created an account. <a href="/">You can now log in.</a>'
        );
      } catch (error) {
        displayMessage("#message", "danger", error.message);
        // This display a message if the user is not successfully registered
      }
    });
  }
}
