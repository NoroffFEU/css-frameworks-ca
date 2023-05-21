import { register } from "../api/auth/register.mjs";

/**
 * @description This function attaches an event listener to the register form's submit event. When the form is submitted,
 * it prevents default and it creates an object.
 * the function registers the new user using the provided data
 */
export function setRegisterFormListener() {
  const accessform = document.querySelector("#registerForm");

  accessform.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    register(profile);
  });
}
