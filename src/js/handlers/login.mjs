import { login } from "../api/auth/login.mjs";
import displayMessage from "../ui/common/displayMessage.mjs";
import * as storage from "../storage/index.mjs";

/**

Sets up a login form event listener.
@function setloginFormListener
@returns {void}
@description This function attaches an event listener to the login form's submit event. 
*/

export function setloginFormListener() {
  const accessform = document.querySelector("#loginForm");

  accessform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    console.log("it worked");
    try {
      const { accessToken, ...userProfile } = await login(profile);

      storage.save("token", accessToken);

      storage.save("profile", userProfile);
      window.location.href = "/profil/index.html";
    } catch (error) {
      console.log(error);
      displayMessage("danger", error, "#message");
    }
  });
}
