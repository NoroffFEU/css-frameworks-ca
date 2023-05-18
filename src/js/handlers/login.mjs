import { login } from "../api/auth/login.mjs";

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");
console.log('2');
  if (form) {
    console.log('3');
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      //Send it to the API
      login(profile);
    });
  }
};
