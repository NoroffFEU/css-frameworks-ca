import { API_SOCIAL_URL } from "../constants.mjs";

/**
 * sends post request to register a new user, will redirect to login if successful
 *
 * @param {Object} profile - the user profile object containing profile information
 * @param {string} profile.username - name
 * @param {string} profile.password - pasword
 * @param {string} profile.email - noroff email
 * @returns {Promise<void>} - redirect to log in page on successful registration
 */

const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(registerURL, {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body
  })

  const result = await response.json()
  console.log(result)

    if (response.ok) {
      window.location.href = '/authentication/login/';
    }
}