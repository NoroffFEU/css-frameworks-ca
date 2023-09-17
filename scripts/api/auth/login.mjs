import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

/**
 * logs in a registered user, stores profile and access token in local storage 
 * @param {Object} profile - the user profile object containing all profile information
 * @param {string} profile.email - noroff email
 * @param {string} profile.password - password 
 * @returns {Promise<void>} - redirect to home page on success, else displays an error message based on server response
 */

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  if (response.status === 200) {
    const { accessToken, ...user } = await response.json();
    storage.save("token", accessToken);
    storage.save("profile", user);
    window.location.href = '/posts/';
  } else {
    const errorData = await response.json();
    const errorMessage = extractErrorMessage(errorData);
    displayErrorMessage(errorMessage);
  }
}

function extractErrorMessage(errorData) {
  if (errorData && errorData.errors && errorData.errors.length > 0) {
    return errorData.errors[0].message;
  }
  return "Unknown error occurred";
}

function displayErrorMessage(message) {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = message;
}
