import { login } from "../api/auth/login.mjs";
// import { displayError } from "./error.mjs";
/**
 * this function handler our login function
 */
export function setLoginFormListener() {
    const form = document.querySelector("#loginForm");
    
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      // Send it to the API
      login(profile);
    });
  }
}