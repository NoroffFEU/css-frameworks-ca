import { register } from "../api/auth/register.mjs";

export function setRegisterFormListener() {
  const accessform = document.querySelector("#registerForm");

  accessform.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    console.log("it worked");
    register(profile);
  });
}
