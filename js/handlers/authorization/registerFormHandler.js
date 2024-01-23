import { registerUser } from "../../api/authorization/register.js";
import { messageForUser } from "../../ui/messageForUser.js";

export function registerFormHandler() {
  const form = document.querySelector("#registerForm");
  form.addEventListener("submit", registerForm);
}

async function registerForm(event) {
  event.preventDefault();
  console.log(event);

  const form = event.target;
  const formData = new FormData(form);
  const entries = formData.entries();
  const userDetails = Object.fromEntries(entries);

  console.log(userDetails);

  try {
    await registerUser(userDetails);
    messageForUser("#message", "success", "You are registered. Please login!");
    form.reset();
    setTimeout(() => {
      var myModal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
      myModal.hide();
    }, 3000);
  } catch (error) {
    console.log(error);
    messageForUser("#message", "danger", error.message);
    throw error;
  }
}
