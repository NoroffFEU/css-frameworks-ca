import { registerUser } from "../../api/authorization/register.js";
import { messageForUser } from "../../ui/messageForUser.js";

export function registerFormHandler() {
  const form = document.querySelector("#registerForm");
  form.addEventListener("submit", handleRegisterForm);
}

async function handleRegisterForm(event) {
  event.preventDefault();
  console.log(event);

  const form = event.target;
  const formData = new FormData(form);
  const entries = formData.entries();
  const userDetails = Object.fromEntries(entries);

  // const fieldset = form.querySelector("fieldset");

  try {
    // fieldset.disabled = true;
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
  } finally {
    // fieldset.disabled = false;
  }
}
