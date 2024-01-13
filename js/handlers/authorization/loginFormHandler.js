import { loginUser } from "../../api/authorization/login.js";
import { messageForUser } from "../../ui/messageForUser.js";

export function loginFormHandler() {
  console.log("loginFormHandler called");
  const form = document.querySelector("#loginForm");
  form.addEventListener("submit", handleLoginForm);
}

async function handleLoginForm(event) {
  event.preventDefault();
  console.log(event);

  const form = event.target;
  const formData = new FormData(form);
  const entries = formData.entries();
  const userDetails = Object.fromEntries(entries);

  try {
    const { accessToken } = await loginUser(userDetails);
    location.href = "/profile";
  } catch (error) {
    console.log(error);
    messageForUser("#message", "danger", error.message);
  }
}
