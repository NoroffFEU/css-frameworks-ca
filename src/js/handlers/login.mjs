import { login } from "../api/auth/login.mjs";
import * as index from "../storage/index.mjs";
import displayMessage from "../api/ui/common/displayMessage.mjs";

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", handleLogin);
  }
}

async function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");

  const button = form.querySelector("button");
  button.innerText = "Logging in...";

  const fieldset = form.querySelector("fieldset");
  fieldset.disabled = true;

  try {
    const bodyData = { email: email, password: password };
    const { accessToken, name } = await login(bodyData);
    index.save("token", accessToken);
    index.save("name", name);
    location.href = "/posts/";
  } catch (error) {
    console.error(error);
    displayMessage("danger", error, "#message");
  } finally {
    button.innerText = "Login";
    fieldset.disabled = false;
  }
}
