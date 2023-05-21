import { register } from "../api/auth/register.mjs";

/**
  *Sets the register form listener to handle form submission.
 */
export function setRegisterFormListener() {
  const form = document.querySelector("#registerForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      //Send the profile data to the API for registration
      register(profile);
    });
  }
};
