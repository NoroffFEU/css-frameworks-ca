import { loginUrl } from "../../constants/api.js";

/**
 * Logs in a user.
 *
 * @param {Object} userDetails - The user's details.
 * @param {string} userDetails.username - The user's username.
 * @param {string} userDetails.password - The user's password.
 * @returns {Promise<Object>} The response from the server.
 * @throws {Error} If the server response is not ok.
 */
export async function loginUser(userDetails) {
  const options = {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(loginUrl, options);

  const json = await response.json();

  if (response.ok) {
    return json;
  }
  throw new Error(json.errors[0].message);
}
