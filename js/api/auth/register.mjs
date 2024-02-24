import { BASE_URL } from "../api.mjs";

const action = "auth/register";
const method = "POST";

/**
 * Registers a new user with the provided profile data.
 *
 * @param {Object} profile - The profile data of the user. Must include 'username' and 'password' properties.
 * @returns {Promise<Object>} The response from the server as a JSON object.
 * @throws {Error} If the server response is not ok, throws an error with the message from the server.
 *
 * @example
 *
 * const profile = {
 *   username: 'newuser',
 *   password: 'newpassword'
 * };
 *
 * register(profile)
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */

export async function register(profile) {
  const registerURL = BASE_URL + action;
  const body = JSON.stringify(profile);

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  };

  const response = await fetch(registerURL, options);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Please try again. ${result.errors[0].message}.`);
  }

  return result;
}
