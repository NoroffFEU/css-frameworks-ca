import { BASE_URL } from "../api.mjs";

/**
 * Logs in a user with the provided profile data.
 *
 * @param {Object} profile - The profile data of the user. Must include 'username' and 'password' properties.
 * @returns {Promise<Object>} The response from the server as a JSON object.
 * @throws {Error} If the server response is not ok, throws an error with the message from the server.
 *
 * @example
 *
 * const profile = {
 *   username: 'testuser',
 *   password: 'testpassword'
 * };
 *
 * login(profile)
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */

export async function login(profile) {
  const method = "POST";
  const loginURL = `${BASE_URL}auth/login`;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const json = await response.json();

  if (response.ok === false) {
    throw new Error(json.errors[0].message);
  }

  return json;
}
