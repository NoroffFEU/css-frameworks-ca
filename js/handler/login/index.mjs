import { login } from "../../api/auth/login.mjs";
import * as storage from "../../handler/storage.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";


export function loginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
  form.addEventListener("submit", dologin); 
  }
}  

async function dologin(event) {
      event.preventDefault()
        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries())

        try {
          const response = await login(profile);
          const { accessToken, name } = response;

          storage.save("token", accessToken);
          storage.save("username", name);

          location.href = "/feed/";
      } catch (error) {
        displayMessage("#message", "danger", error.message);
      }
}

