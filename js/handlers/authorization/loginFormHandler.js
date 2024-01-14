import { loginUser } from "../../api/authorization/login.js";
import { messageForUser } from "../../ui/messageForUser.js";
import * as utils from "../../utils/storage/storage.js";

export function loginFormHandler() {
  console.log("loginFormHandler called");
  const form = document.querySelector("#loginForm");
  form.addEventListener("submit", loginForm);
}

async function loginForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const entries = formData.entries();
  const userData = Object.fromEntries(entries);

  try {
    const response = await loginUser(userData);
    console.log(response);
    if (response && response.accessToken) {
      utils.save("token", response.accessToken);
      // console.log(utils.get("token"));
      form.reset();
      window.location.href = "/profile";
    }
  } catch (error) {
    console.error("Login error:", error.message);
    messageForUser("#loginMessage", "danger", error.message);
  } finally {
  }
}
