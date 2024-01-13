import { loginUser } from "../../api/authorization/login.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { get } from "../../utils/storage/get.js";
import { remove } from "../../utils/storage/remove.js";
import { save } from "../../utils/storage/save.js";

console.log(get, remove, save);

export function loginFormHandler() {
  console.log("loginFormHandler called");
  const form = document.querySelector("#loginForm");
  form.addEventListener("submit", handleLoginForm);
}

async function handleLoginForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // const entries = formData.entries();
  const userData = Object.fromEntries(formData.entries());

  console.log(userData);

  // fix this code!!!!!!!!!!!!!!!!!
  try {
    const response = await loginUser(userData);
    if (response && response.token) {
      // Here you can save the token using your save utility
      save("token", response.token);
      // Redirect to profile or another page as needed
      window.location.href = "/profile";
    } else {
      messageForUser("#message", "danger", "Login failed: No token received");
    }
  } catch (error) {
    console.error("Login error:", error.message);
    messageForUser("#loginMessage", "danger", error.message);
  } finally {
  }
}
