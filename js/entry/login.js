import { displayMessage } from "./entryMessage.js";
import { setLocalStorage } from "../localStorage/localStorage.js";
import { apiUrls } from "../api/constant.js";
import { apiCall } from "../api/api.js";

/**
 * Logs in a user with the provided email and password, stores the user name and JWT in local storage
 *
 *
 * @async
 * @param {HTMLInputElement} email - The input element containing the user's email.
 * @param {HTMLInputElement} password - The input element containing the user's password.
 * @returns {void} - if function does not get token in return from apiCall, the login failed and it will displayMessage and return
 *
 * @example
 * // Example usage:
 * const emailInput = example@mail.com
 * const passwordInput = password1234
 * await loginUser(emailInput, passwordInput);
 */

export const loginUser = async (email, password) => {
  const data = JSON.stringify({
    email: email.value,
    password: password.value,
  });

  const { accessToken, name } = await apiCall(apiUrls.login_Url, "post", data);

  if (!accessToken) {
    displayMessage("login", "Wrong username or password", "danger");
    return;
  }
  setLocalStorage("token", accessToken);
  setLocalStorage("name", name);
  window.location.replace("../../profile/index.html");
};
