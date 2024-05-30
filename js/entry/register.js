import { displayMessage } from "./entryMessage.js";
import { apiUrls } from "../api/constant.js";
import { apiCall } from "../api/api.js";

/**
 * registers in a user with the provided name, email and password.
 *
 *
 *
 * @async
 *  @param {HTMLInputElement} name - The input element containing the user's user name.
 * @param {HTMLInputElement} email - The input element containing the user's email.
 * @param {HTMLInputElement} password - The input element containing the user's password.
 * @returns {void} - if function does  get status from the apiCall  that === "Bad Request " the register has failed and it will call displayMessage function with the error message and return.  Or the register was success and it will call displayMessage function with a success message.
 *
 * @example
 * // Example usage:
 * registerUser(username, email, password)
 * const userName = username
 * const emailInput = example@mail.com
 * const passwordInput = password1234
 * await loginUser(emailInput, passwordInput);
 */
export const registerUser = async (userName, email, password) => {
  const data = JSON.stringify({
    name: userName.value,
    email: email.value,
    password: password.value,
  });

  const { status, errors } = await apiCall(apiUrls.register_Url, data);

  if (status == "Bad Request") {
    errors.filter(({ message }) => displayMessage("register", message, "danger"));
    return;
  }
  displayMessage("register", `Register was successful, please log in with your new account.`, "success");
};
